import { NextFunction, Request, Response } from "express";
import { AuthorizedError, BadRequestError } from "./error.res";
import keystoreServices from "../services/keystore.services";
import { Types } from "mongoose";
import { verifyTokens } from "../utils";
import { KeyStore } from "../entities/keystore.entity";
import { UserWithoutPassword } from "../entities/user.entity";

interface AuthenticatedRequest extends Request {
    keyStore?: KeyStore,
    user?: UserWithoutPassword,
    refreshToken?: string
}

export const verifyAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const clientId = req.header("x-client-id")?.toString();
	if (!clientId) throw new BadRequestError("❌ ClientId Not Provided");

	const keyStore = await keystoreServices.findByUser(new Types.ObjectId(clientId));
	if (!keyStore) throw new AuthorizedError("❌ Your're not sign in yet");

	const refreshToken = req.header('x-rtoken-id"')?.toString();
	if (refreshToken) {
		const decode = verifyTokens(refreshToken, keyStore.privateKey);
		if (!decode)
			throw new AuthorizedError("❌ Unauthorized Error");

		req.keyStore = keyStore;
		req.user = keyStore.user as UserWithoutPassword;
		req.refreshToken = refreshToken;
		next();
	} 
    else {
		const accessToken = req.cookies["accessToken"]?.toString();
		console.log(accessToken);
		if (!accessToken) throw new AuthorizedError("❌ No Token Provided");

		const decode = await verifyTokens(accessToken, keyStore.publicKey);
		if (!decode)
			throw new AuthorizedError("❌ Unauthorized Error");

		req.user = keyStore.user as UserWithoutPassword;
		next();
	}
};
