import { Types } from "mongoose";
import { UserRepository } from "../repositories/user.repo";
import {
	Level,
	User,
	UserGoogleLoginForm,
	UserRegistedForm,
} from "../entities/user.entity";
import { UserModel } from "../models/user.model";
import { LIMIT_DOCUMENT_QUERY } from "../constants";
import { BadRequestError } from "../middlewares/error.res";

class UserServices implements UserRepository {
	private static instance: UserServices;

	// Singleton: Sử dụng getInstance để đảm bảo chỉ có một instance của lớp này
	static getInstance(): UserServices {
		return UserServices.instance || new UserServices();
	}

	async isExisted(email: string): Promise<boolean> {
		return (await UserModel.countDocuments({ email })) !== 0;
	}

	async findAll(): Promise<User[]> {
		return await UserModel.find({}).limit(LIMIT_DOCUMENT_QUERY).lean();
	}

	async findById(id: Types.ObjectId): Promise<User | null> {
		return await UserModel.findById(id).lean();
	}

	async findByEmail(email: string): Promise<User | null> {
		return await UserModel.findOne({ email }).lean();
	}

	async findByGoogleId(googleId: string): Promise<User | null> {
		return await UserModel.findOne({ googleId }).lean();
	}

	async create(form: UserRegistedForm | UserGoogleLoginForm): Promise<User> {
		try {
			return await UserModel.create(form);
		} catch (error) {
			throw new BadRequestError("❌ Invalid Error! ");
		}
	}

	async update(id: Types.ObjectId, payload: Partial<User>): Promise<User | null> {
		return await UserModel.findByIdAndUpdate(id, payload, {
			returnOriginal: false,
		});
	}

	async upgrade(id: Types.ObjectId, level: Level): Promise<User | null> {
		return await UserModel
			.findByIdAndUpdate(id, { $set: { level: level } }, { returnOriginal: false })
			.lean();
	}

	async delete(id: Types.ObjectId): Promise<User | null> {
		return await UserModel.findByIdAndDelete(id);
	}
}

export default UserServices.getInstance();
