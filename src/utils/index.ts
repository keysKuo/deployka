import JWT from "jsonwebtoken";
import crypto from "crypto";
import { ACCESS_TOKEN_EXPIRY, KeyPair, REFRESH_TOKEN_EXPIRY, TokenPair } from "../constants";
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import bcrypt from 'bcrypt';

interface UserPayload extends JwtPayload {
	userId: Types.ObjectId | null
}

export function omit<T extends object, K extends keyof T>(
	object: T,
	fields: K[]
  ): Omit<T, K> {
	// Tạo đối tượng mới từ các cặp key-value mà không chứa các thuộc tính bị omit
	const result = Object.fromEntries(
	  Object.entries(object).filter(([key]) => !fields.includes(key as K))
	) as Omit<T, K>;

	return result;
  }

export const catchAsync = (fn: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

export const generateKeys = (): KeyPair => {
	const privateKey: string = crypto.randomBytes(64).toString("hex");
	const publicKey: string = crypto.randomBytes(64).toString("hex");

	return { privateKey, publicKey };
};

export const generateTokens = (payload: UserPayload, keys: KeyPair): TokenPair => {
	const accessToken: string = JWT.sign(payload, keys.publicKey, {
		expiresIn: ACCESS_TOKEN_EXPIRY,
	});

	const refreshToken: string = JWT.sign(payload, keys.privateKey, {
		expiresIn: REFRESH_TOKEN_EXPIRY,
	});

	return { accessToken, refreshToken };
};

export const verifyTokens = async (token: string, secretKey: string): Promise<UserPayload | null> => {
	let payload = null;
	JWT.verify(token, secretKey, (err, decode) => {
		if (err) return null;
		payload = decode as UserPayload;
	});
	return payload;
};

export const hashedBcrypt = async (str: string): Promise<string> => {
    return await bcrypt.hash(str, 10);
}

export const matchedBcrypt = async (str: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(str, hashed);
}

export const generateId = (length: number): string => {
    let result = "";
    const subset = "1234567890qwertyuiopasdfghjklzxcvbnm";

    for (let i = 0; i < length; i++) {
        result += subset[Math.floor(Math.random() * subset.length)];
    }

    return result;
}

export const calculateOrderAmount = (items: any[]) => {
	return 0;
};
