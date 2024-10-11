import { KeyPair } from "../constants";
import { KeyStore } from "../entities/keystore.entity";
import { Types } from "mongoose";

export interface KeyStoreRepository {
	findAll(): Promise<KeyStore[]>;
	findById(id: Types.ObjectId): Promise<KeyStore | null>;
	findByUser(userId: Types.ObjectId): Promise<KeyStore | null>;
	refresh(userId: Types.ObjectId, keys: KeyPair, refreshToken: string): Promise<KeyStore>;
	deleteById(id: Types.ObjectId): Promise<KeyStore | null>;
	deleteByUser(userId: Types.ObjectId): Promise<KeyStore | null>;
}
