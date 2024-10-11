import { KeyStore } from "../entities/keystore.entity";
import { Schema, Types, model } from "mongoose";

const KeyStoreSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: "User", required: true },
		publicKey: { type: String, required: true },
		privateKey: { type: String, required: true },
		refreshTokensUsed: { type: [String], default: [] },
		refreshToken: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const KeyStoreModel = model<KeyStore>("KeyStore", KeyStoreSchema);
export { KeyStoreModel };
