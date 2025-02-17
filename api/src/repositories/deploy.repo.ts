import { BuildForm, BuildReponse, CancelForm, CancelResponse, DeleteForm, DeleteResponse, UploadForm, UploadResponse } from "shared-types";

export interface DeployRepository {
    upload(form: UploadForm): Promise<UploadResponse>;
    build(form: BuildForm): Promise<BuildReponse>;
    delete(form: DeleteForm): Promise<DeleteResponse>;
    cancel(form: CancelForm): Promise<CancelResponse>;
}
