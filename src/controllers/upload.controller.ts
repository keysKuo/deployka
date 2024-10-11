import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../middlewares/success.res";
import uploadServices from "../services/upload.services";

class UploadController {
    static async uploadRepo(req: Request, res: Response, next: NextFunction) {
        return new SuccessResponse({
			code: 201,
			message: `✔️ Uploaded Repository`,
			metadata: await uploadServices.upload(req.body.repoUrl),
		}).send({ response: res });
    }
}

export default UploadController;
