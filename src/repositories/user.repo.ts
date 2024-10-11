import { Level, User, UserGoogleLoginForm, UserRegistedForm } from "../entities/user.entity";
import { Types } from "mongoose";

export interface UserRepository {
	isExisted(email: string): Promise<boolean>;
	findAll(): Promise<User[]>;
	findById(id: Types.ObjectId): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	findByGoogleId(googleId: string): Promise<User | null>;
	create(form: UserRegistedForm  | UserGoogleLoginForm): Promise<User>;
	update(id: Types.ObjectId, payload: Partial<User>): Promise<User | null>;
	upgrade(id: Types.ObjectId, level: Level): Promise<User | null>;
	delete(id: Types.ObjectId): Promise<User | null>;
}
