import JWT from "jsonwebtoken";
import crypto from "crypto";
import { ACCESS_TOKEN_EXPIRY, KeyPair, REFRESH_TOKEN_EXPIRY, TokenPair } from "../constants";
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

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

/*  Get all folders and files in recursion */
export const getAllFiles = (folderPath: string): string[] => {
    let result: string[] = [];

    // Read all files from given folder
    const rootFolder = fs.readdirSync(folderPath)

    // Loop through all files in the folder
    rootFolder.forEach(file => {
        // Join filePath with folderPath to get full path
        const filePath = path.join(folderPath, file);

        // If it's a folder -> concat the filePath List with recursion of children folder's files
        // Else just push remain files to the filePath List
        if (fs.statSync(filePath).isDirectory()) {
            result = result.concat(getAllFiles(filePath));
        }
        else {
            result.push(filePath);
        }
    })

    return result;
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
