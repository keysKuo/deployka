import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../middlewares/success.res";
import authServices from "../services/auth.services";
import { Types } from "mongoose";
import PaymentService from "../services/payment.services";

class PaymentController {
    static async createSession(req: Request, res: Response, next: NextFunction) {
        return new SuccessResponse({ 
			code: 201,
			message: `✔️ Created payment session`,
			metadata: await PaymentService.createSession({ ...req.body }),
		}).send({ response: res });
    }

    static async retrieve(req: Request, res: Response, next: NextFunction) {

    }
}

export default PaymentController;
