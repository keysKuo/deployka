import { BuildForm, BuildReponse, DeployRepository, RepositoryData, UploadForm, UploadResponse } from "../repositories/deploy.repo";
import simpleGit from 'simple-git';
import { generateId } from "../utils";
import path from "path";
import { uploadFolderToS3 } from "../middlewares/aws.handler";
import { OUTPUT_DIR, R2_BUCKET, ROOT_DIR } from "../constants";
import { createClient } from 'redis';
import { deleteFolder } from "../middlewares/file.handler";
import { createSubDomain } from "../middlewares/cloudflare.handler";
import { BadRequestError, FileNotFoundError } from "../middlewares/error.res";
import { getRepositoryData } from "../middlewares/project.build";
const publisher = createClient({
    url: 'redis://localhost:6379'
});
publisher.connect();

class DeployService implements DeployRepository {
	private static instance: DeployService;

	// Singleton: Sử dụng getInstance để đảm bảo chỉ có một instance của lớp này
	static getInstance(): DeployService {
		return DeployService.instance || new DeployService();
	}

    async upload(form: UploadForm): Promise<UploadResponse> {
        console.log(form);
        const uploadId = generateId(6);
        const outputFolder = path.posix.join(OUTPUT_DIR, uploadId);

        try {
            const repoData = await getRepositoryData(form.repoUrl);
            if (!repoData) {
                throw new FileNotFoundError('Repository not found');
            }

            console.log('⬇ Cloning repository...');
            await simpleGit().clone(form.repoUrl, outputFolder);

            console.log('⬆ Uploading sources to S3...');
            await uploadFolderToS3(R2_BUCKET, 'sources', outputFolder);

            deleteFolder(outputFolder);

            return {
                success: true,
                uploadId: uploadId,
                repoData: {
                    id: repoData.id,
                    node_id: repoData.node_id,
                    name: repoData.name,
                    full_name: repoData.full_name,
                    private: repoData.private,
                    avatar_url: repoData.owner.avatar_url
                } as RepositoryData,
                repoUrl: form.repoUrl,
                uploadDir: outputFolder,
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestError("Error while uploading repository");
        }
    }

    async build(form: BuildForm): Promise<BuildReponse> {
        publisher.lPush('build-queue', JSON.stringify(form));
        const subdomain = form.subdomain || await createSubDomain(form.projectName, form.uploadId);
        console.log(subdomain);
        return { subdomain };
    }

    async cancel(uploadId: string): Promise<boolean> {
        return false;
    }
}

export default DeployService.getInstance();
