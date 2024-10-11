import { Schema, Types, model } from "mongoose";
import { User } from "../entities/user.entity";

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String },
		avatar: { type: String, required: true },
		gender: { type: String, enum: ["male", "female"] },
		level: {
			type: String,
			enum: ["regular", "premium", "business"],
			default: "regular",
		},
		googleId: { type: String },
	},
	{
		timestamps: true,
	}
);

const UserModel = model<User>("User", UserSchema);
export { UserModel };
