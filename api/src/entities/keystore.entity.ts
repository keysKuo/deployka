import { User } from "./user.entity";
import { Types } from "mongoose";

export type KeyStore = {
	_id?: Types.ObjectId;
	user: User | Types.ObjectId;
	publicKey: string;
	privateKey: string;
	refreshTokensUsed: string[];
	refreshToken: string;
};
