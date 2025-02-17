import { Types } from "mongoose";
import { User } from "./user";

export type KeyStore = {
	_id?: Types.ObjectId;
	user: User | Types.ObjectId;
	publicKey: string;
	privateKey: string;
	refreshTokensUsed: string[];
	refreshToken: string;
};
