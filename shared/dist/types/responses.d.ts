import { RepositoryData } from "./repository";
import { UserWithoutPassword } from "./user";
export type UserDataResponse = {
    user: UserWithoutPassword | null;
    accessToken?: string;
    refreshToken?: string;
};
export type BuildReponse = {};
export type DeleteResponse = {};
export type CancelResponse = {};
export type UploadResponse = {
    success: boolean;
    uploadId: string;
    repoData: RepositoryData;
    repoUrl: string;
    uploadDir?: string;
    error?: string;
};
//# sourceMappingURL=responses.d.ts.map