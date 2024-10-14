import { UploadRepository, UploadResponse } from "../repositories/upload.repo";
import simpleGit from 'simple-git';
import { generateId } from "../utils";
import path from "path";
import { uploadFolderToS3 } from "../middlewares/aws.handler";
import { OUTPUT_DIR, ROOT_DIR } from "../constants";
import { createClient } from 'redis';
import { deleteFolder } from "../middlewares/file.handler";
import { createSubDomain } from "../middlewares/cloudflare.handler";
const publisher = createClient({
    url: 'redis://localhost:6379'
});
publisher.connect();

class UploadService implements UploadRepository {
	private static instance: UploadService;

	// Singleton: Sử dụng getInstance để đảm bảo chỉ có một instance của lớp này
	static getInstance(): UploadService {
		return UploadService.instance || new UploadService();
	}

    async upload(repoUrl: string): Promise<UploadResponse> {
        const uploadId = generateId(6);
        const outputFolder = path.posix.join(OUTPUT_DIR, uploadId);

        try {
            await simpleGit().clone(repoUrl, outputFolder);

            await uploadFolderToS3('deployka', 'sources', outputFolder);

            await createSubDomain('deployka', uploadId);

            deleteFolder(outputFolder);
            publisher.lPush('build-queue', uploadId);

            return {
                success: true,
                uploadDir: outputFolder,
            }
        } catch (error) {
            return {
                success: false,
                error: error as string
            }
        }
    }
}

export default UploadService.getInstance();
