export type UploadResponse = {
    success: boolean,
    uploadDir?: string,
    error?: string
}

export interface UploadRepository {
    upload(repoUrl: string): Promise<UploadResponse>;
}
