import { Types } from "mongoose";
import { KeyStoreRepository } from "../repositories/keystore.repo";
import { KeyStore } from "../entities/keystore.entity";
import { KeyStoreModel } from "../models/keystore.model";
import { KeyPair, LIMIT_DOCUMENT_QUERY } from "../constants";
import { BadRequestError } from "../middlewares/error.res";

class KeyStoreService implements KeyStoreRepository {
	private static instance: KeyStoreService;

	// Singleton: Sử dụng getInstance để đảm bảo chỉ có một instance của lớp này
	static getInstance(): KeyStoreService {
		return KeyStoreService.instance || new KeyStoreService();
	}

	async findAll(): Promise<KeyStore[]> {
		return await KeyStoreModel.find({}).limit(LIMIT_DOCUMENT_QUERY).lean();
	}

	async findById(id: Types.ObjectId): Promise<KeyStore | null> {
		return await KeyStoreModel.findById(id).lean();
	}

	async findByUser(userId: Types.ObjectId): Promise<KeyStore | null> {
		return await KeyStoreModel
			.findOne({ user: userId })
			.populate({ path: 'user', select: '_id username email avatar gender level'})
			.lean();
	}

	async refresh(userId: Types.ObjectId, keys: KeyPair, refreshToken: string): Promise<KeyStore> {
		const filter = { user: userId };
		const update: Partial<KeyStore> = {
			publicKey: keys.publicKey,
			privateKey: keys.privateKey,
			refreshTokensUsed: [],
			refreshToken,
		};
		const options = { upsert: true, new: true };

		const newKeyStore = await KeyStoreModel.findOneAndUpdate(
			filter,
			update,
			options
		);

		if (!newKeyStore)
			throw new BadRequestError(`❌ Error KeyStoreService.createToken`);
		return newKeyStore;
	}

	async deleteById(id: Types.ObjectId): Promise<KeyStore | null> {
		return await KeyStoreModel.findByIdAndDelete(id).lean();
	}

	async deleteByUser(userId: Types.ObjectId): Promise<KeyStore | null> {
		return await KeyStoreModel.findOneAndDelete({ user: userId }).lean();
	}
}

export default KeyStoreService.getInstance();
