import { Types } from "mongoose";
import { User, UserDataResponse, UserGoogleLoginForm, UserLoginForm, UserRegistedForm, UserWithoutPassword } from "../entities/user.entity";
import { AuthRepository } from "../repositories/auth.repo";
import { KeyPair, TokenPair } from "../constants";
import { generateKeys, generateTokens, hashedBcrypt, matchedBcrypt } from "../utils";
import { AuthorizedError, BadRequestError, ConflictError, ForbiddenError } from "../middlewares/error.res";
import keystoreServices from "./keystore.services";
import userServices from "./user.services";
import devConfig from "../configs/dev.config";
import { KeyStore } from "../entities/keystore.entity";
import _ from "lodash";

class AuthServices implements AuthRepository {
	private static instance: AuthServices;

	// Singleton: Sử dụng getInstance để đảm bảo chỉ có một instance của lớp này
	static getInstance(): AuthServices {
		return AuthServices.instance || new AuthServices();
	}

	async signUp(form: UserRegistedForm): Promise<UserDataResponse> {
		const existedUser = await userServices.isExisted(form.email);
		if (existedUser) 
			throw new BadRequestError(`❌ User already existed!`);

		if (form.password !== form.confirmPassword) 
			throw new BadRequestError(`❌ Password and Confirm Password must be same`);

		const random: number = Math.floor(Math.random() * 4) + 1;
		const avatar = `${devConfig.frontendURL}/${form.gender}-avatar${random}.jpg`;
		const passwordHash = await hashedBcrypt(form.password);
		const newUser = await userServices.create({...form, avatar, password: passwordHash });
		return { 
			user: _.pick(newUser, ['_id', 'username', 'email', 'avatar', 'gender', 'level']) 
		};
	}

	async signIn(form: UserLoginForm): Promise<UserDataResponse> {
		const existedUser = await userServices.findByEmail(form.email);
		if (!existedUser) 
			throw new BadRequestError(`❌ User doesn't exist!`);
		
		const isMatched = await matchedBcrypt(form.password, existedUser.password);
		if (!isMatched)
			throw new AuthorizedError(`❌ Authentication Error!`);

		const { accessToken, refreshToken }: TokenPair = await this.refreshToken(existedUser._id);
		return { 
			user: _.omit(existedUser, 'password'),
		 	accessToken,
		  	refreshToken 
		};
	}

	async signInWithGoogle(form: UserGoogleLoginForm): Promise<UserDataResponse> {
		const googleUser = 
			await userServices.findByGoogleId(form.googleId) || 
			await userServices.create(form);

		if (!googleUser)
			throw new ConflictError('❌ Google Sign On Error!');

		const { accessToken, refreshToken }: TokenPair = await this.refreshToken(googleUser._id);
		return { user: googleUser, accessToken, refreshToken };
	}

	async logout(userId: Types.ObjectId): Promise<KeyStore | null> {
		const delkey = await keystoreServices.deleteByUser(userId);
		if (!delkey) 
			throw new BadRequestError(`❌ Delete KeyStore Fail!`);

		return delkey;
	}

	async refreshToken(userId: Types.ObjectId): Promise<TokenPair> {
		const newKeys: KeyPair = generateKeys();

		const { accessToken, refreshToken }: TokenPair = generateTokens(
			{ userId },
			newKeys
		);
		if (!accessToken || !refreshToken)
			throw new ForbiddenError(`❌ Error generate tokens`);

		await keystoreServices.refresh(userId, newKeys, refreshToken);
		return { accessToken, refreshToken };
	}
}

export default AuthServices.getInstance();
