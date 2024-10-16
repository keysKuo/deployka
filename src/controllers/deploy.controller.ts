import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../middlewares/success.res";
import deployServices from "../services/deploy.services";

class DeployController {
    static async uploadRepo(req: Request, res: Response, next: NextFunction) {
        return new SuccessResponse({
			code: 201,
			message: `✔️ Uploaded Repository`,
			metadata: await deployServices.upload({...req.body}),
		}).send({ response: res });
    }

    static async buildProject(req: Request, res: Response, next: NextFunction) {
        return new SuccessResponse({
			code: 201,
			message: `✔️ Building project...`,
			metadata: await deployServices.build({...req.body}),
		}).send({ response: res });
    }

    static async deleteProject(req: Request, res: Response, next: NextFunction) {
        return new SuccessResponse({
			code: 201,
			message: `✔️ Deleted project`,
			metadata: await deployServices.delete({...req.body}),
		}).send({ response: res });
    }
}

export default DeployController;
