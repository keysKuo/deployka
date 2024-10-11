import { BadRequestError } from "../middlewares/error.res";
import { UploadRepository, UploadResponse } from "../repositories/upload.repo";
import simpleGit from 'simple-git';
import { generateId } from "../utils";
import path from "path";

class UploadService implements UploadRepository {
	private static instance: UploadService;

	// Singleton: Sử dụng getInstance để đảm bảo chỉ có một instance của lớp này
	static getInstance(): UploadService {
		return UploadService.instance || new UploadService();
	}

    async upload(repoUrl: string): Promise<UploadResponse> {
        const uploadId = generateId(6);
        const rootDir = process.cwd();
        const outputFolder = path.join(rootDir, `dist/output/${uploadId}`);

        try {
            await simpleGit().clone(repoUrl, outputFolder);
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
