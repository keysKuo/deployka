// import { Checkout } from "../entities/Checkout.entity";
import { Types } from "mongoose";
import { Checkout, CheckoutForm } from "../entities/checkout.entity";
export interface CheckoutRepository {
	findAll(): Promise<Checkout[]>;
	findById(id: Types.ObjectId): Promise<Checkout | null>;
	findByUser(userId: Types.ObjectId): Promise<Checkout | null>;
	create(form: CheckoutForm): Promise<Checkout>;
	complete(id: Types.ObjectId): Promise<Checkout | null>;
	cancel(id: Types.ObjectId): Promise<Checkout | null>;
	update(id: Types.ObjectId, payload: Partial<Checkout>): Promise<Checkout | null>;
	delete(id: Types.ObjectId): Promise<Checkout | null>;
}
