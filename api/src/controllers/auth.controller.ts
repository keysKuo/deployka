import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../middlewares/success.res";
import authServices from "../services/auth.services";
import { Types } from "mongoose";

class AuthController {
	static async signUp(req: Request, res: Response, next: NextFunction) {
		return new SuccessResponse({
			code: 201,
			message: `✔️ Registed new user`,
			metadata: await authServices.signUp({ ...req.body }),
		}).send({ response: res });
	}

	static async signIn(req: Request, res: Response, next: NextFunction) {
		const metadata = await authServices.signIn({ ...req.body });
		return new SuccessResponse({
			code: 200,
			message: "✔️ Login successfully",
			metadata,
		}).send({
			response: res,
			callback: (res) => {
				res.cookie("accessToken", metadata.accessToken, {
					maxAge: 2 * 24 * 60 * 60 * 1000,
					httpOnly: true,
					sameSite: "strict",
					secure: process.env.NODE_ENV !== "development",
				});
			},
		});
	}

	static async signInWithGoogle(req: Request, res: Response, next: NextFunction) {
		const metadata = await authServices.signInWithGoogle({ ...req.body });
		return new SuccessResponse({
			code: 200,
			message: `✔️ Login Successfully`,
			metadata,
		}).send({
			response: res,
			callback: (res) => {
				res.cookie("accessToken", metadata.accessToken, {
					maxAge: 2 * 24 * 60 * 60 * 1000,
					httpOnly: true,
					sameSite: "strict",
					secure: process.env.NODE_ENV !== "development",
				});
			},
		});
	}

	static async logOut(req: Request, res: Response, next: NextFunction) {
		return new SuccessResponse({
			code: 200,
			message: `✔️ Logout Successfully`,
			metadata: await authServices.logout(new Types.ObjectId(req.params.userId)),
		}).send({
			response: res,
			callback: (res) => {
				res.cookie("accessToken", "", {
					maxAge: 2 * 24 * 60 * 60 * 1000,
				});
			},
		});
	}


}

export default AuthController;
