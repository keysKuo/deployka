import { Types } from "mongoose";

export enum Level {
	REGULAR = 'regular',
	PREMIUM = 'premium',
	BUSINESS = 'business'
}

export enum Gender {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other'
}

export type User = {
	_id: Types.ObjectId;
	username: string;
	email: string;
	password: string;
	avatar?: string;
	gender: Gender;
	level: Level;
	upgradable?: () => boolean;
};

export type UserRegistedForm = Omit<User, "_id"> & {
	confirmPassword: string;
};

export type UserLoginForm = {
	email: string;
	password: string;
};

export type UserGoogleLoginForm = Omit<User, "password" | "_id"> & {
	googleId: string;
};

export type UserWithoutPassword = Omit<User, "password">;

export type UserDataResponse = {
	user: UserWithoutPassword | null;
	accessToken?: string;
	refreshToken?: string;
};
