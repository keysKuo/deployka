import { Schema, Types, model } from "mongoose";
import { Checkout, CheckoutStatus, PaymentMethod } from "../entities/checkout.entity";

const CheckoutSchema: Schema = new Schema(
	{
		transactionId: { type: String, reuquired: true },
		cartId: { type: String, reuquired: true },
		user: { type: Types.ObjectId, ref: "User", required: true },
		paymentMethod: { type: PaymentMethod, reuquired: true },
		total: { type: Number, required: true },
		tax: { type: Number, required: true },
		discount: { type: Number },
		status: { type: CheckoutStatus, required: true },
	},
	{
		timestamps: true,
	}
);

const CheckoutModel = model<Checkout>("Checkout", CheckoutSchema);
export { CheckoutModel };
