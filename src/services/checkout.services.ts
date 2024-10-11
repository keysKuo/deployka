import { Types } from "mongoose";
import {
	Checkout,
	CheckoutForm,
	CheckoutStatus,
} from "../entities/checkout.entity";
import { CheckoutRepository } from "../repositories/checkout.repo";
import { CheckoutModel } from "../models/checkout.model";
import { GLOBAL_TAX, LIMIT_DOCUMENT_QUERY } from "../constants";

class CheckoutService implements CheckoutRepository {
	private static instance: CheckoutService;

	// Singleton: Sử dụng getInstance để đảm bảo chỉ có một instance của lớp này
	static getInstance(): CheckoutService {
		return CheckoutService.instance || new CheckoutService();
	}

	async findAll(): Promise<Checkout[]> {
		return await CheckoutModel.find({}).limit(LIMIT_DOCUMENT_QUERY).lean();
	}

	async findById(id: Types.ObjectId): Promise<Checkout | null> {
		return await CheckoutModel.findById(id).lean();
	}

	async findByUser(userId: Types.ObjectId): Promise<Checkout | null> {
		return await CheckoutModel.findOne({ user: userId }).lean();
	}

	async create(form: CheckoutForm): Promise<Checkout> {
		const newCheckout = new CheckoutModel({
			...form,
			tax: GLOBAL_TAX,
			status: CheckoutStatus.PENDING,
		});
		await newCheckout.save();
		return newCheckout;
	}

	async complete(id: Types.ObjectId): Promise<Checkout | null> {
		return await CheckoutModel.findByIdAndUpdate(
			id,
			{ $set: { status: CheckoutStatus.COMPLETED } },
			{ returnOriginal: false }
		).lean();
	}

	async cancel(id: Types.ObjectId): Promise<Checkout | null> {
        return await CheckoutModel.findByIdAndUpdate(
			id,
			{ $set: { status: CheckoutStatus.CANCELLED } },
			{ returnOriginal: false }
		).lean();
    }

	async update(id: Types.ObjectId, payload: Partial<Checkout>): Promise<Checkout | null> {
        return await CheckoutModel.findByIdAndUpdate(
			id,
			{ $set: payload },
			{ returnOriginal: false }
		).lean();
    }

	async delete(id: Types.ObjectId): Promise<Checkout | null> {
        return await CheckoutModel.findByIdAndDelete(id).lean();
    }
}

export default CheckoutService.getInstance();
