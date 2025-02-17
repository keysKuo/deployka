import { CheckoutForm } from "shared-types";
import { STRIPE_API_KEY } from "../constants";
import { StripeItem } from "../entities/payment.entity";
import { BadRequestError } from "../middlewares/error.res";
import { PaymentRepository } from "../repositories/payment.repo";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_API_KEY);

const dumps: StripeItem[] = [
	{
		price_data: {
			currency: "usd",
			product_data: {
				name: "T Shirt",
				images: ["https://i.ebayimg.com/images/g/OXMAAOSwzOxUU8KP/s-l1200.jpg"]
			},
			unit_amount: 2000
		},
		quantity: 1
	}
]

class StripePayment implements PaymentRepository {
	private static instance: StripePayment;

	static getInstance(): StripePayment {
		return StripePayment.instance || new StripePayment();
	}

	async createSession(items: StripeItem[] = []): Promise<any> {
		const session = await stripe.checkout.sessions.create({
			line_items: dumps,
			mode: "payment",
			ui_mode: "embedded",
			return_url:
				"https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}",
		});

		return session;
	}

	async retrieve(): Promise<any> {}
}

class PaypalPayment implements PaymentRepository {
	private static instance: PaypalPayment;

	static getInstance(): PaypalPayment {
		return PaypalPayment.instance || new PaypalPayment();
	}

	async createSession(): Promise<any> {}

	async retrieve(): Promise<any> {}
}

// export class MomoPayment implements PaymentRepository {

// }

// export class ZaloPayment implements PaymentRepository {

// }

class PaymentService {
	static async createSession(form: CheckoutForm): Promise<any> {
		switch (form.paymentMethod) {
			case 'stripe':
				return await StripePayment.getInstance().createSession();
			case 'paypal':
				return await StripePayment.getInstance().createSession();
			case 'momo':
				return await StripePayment.getInstance().createSession();
			case 'zalopay':
			default:
				throw new BadRequestError("❌ Payment method not available");
		}
	}

	static async retrieve(): Promise<any> {}
}

export default PaymentService;
