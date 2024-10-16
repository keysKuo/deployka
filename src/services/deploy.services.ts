import { BuildForm, BuildReponse, DeleteForm, DeleteResponse, DeployRepository, RepositoryData, UploadForm, UploadResponse } from "../repositories/deploy.repo";
import simpleGit from 'simple-git';
import { generateId } from "../utils";
import path from "path";
import { deleteFromS3, uploadFolderToS3 } from "../middlewares/aws.handler";
import { OUTPUT_DIR, R2_BUCKET, ROOT_DIR } from "../constants";
import { createClient } from 'redis';
import { deleteFolder, isExisted } from "../middlewares/file.handler";
import { createSubDomain, deleteSubDomain } from "../middlewares/cloudflare.handler";
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
        let rebuild = form.rebuild;
        let subdomain = form.subdomain;
        if (!rebuild) {
            subdomain = await createSubDomain(form.projectName, form.uploadId);
        }

        console.log(subdomain)
        return { subdomain };
    }

    async delete(form: DeleteForm): Promise<DeleteResponse> {
        const folderPath = path.posix.join(ROOT_DIR, `build-scripts/dist/output` , form.storedId);
        if (!isExisted(folderPath)) throw new FileNotFoundError("Project not found");

        console.log('🗑️ Deleting subdomain: ' + `${form.projectName}-${form.storedId}...`);
        const delDomainResult = await deleteSubDomain(form.projectName, form.storedId);
        if (!delDomainResult)   throw new BadRequestError("Error while deleting domain");

        console.log('🗑️ Deleting sources from S3: ' + form.storedId + '...');
        const delFolderS3Result = await deleteFromS3(R2_BUCKET, `sources/${form.storedId}`);
        if (!delFolderS3Result) throw new BadRequestError("Error while deleting folder on S3");

        console.log('✔️ Cleared sources on server');
        deleteFolder(path.posix.join(ROOT_DIR, `build-scripts/dist/output` , form.storedId));
        return {}
    }

    async cancel(uploadId: string): Promise<boolean> {
        return false;
    }
}

export default DeployService.getInstance();
