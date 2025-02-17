import { StripeItem } from "../entities/payment.entity";

export interface PaymentRepository {
	createSession(items: StripeItem[]): Promise<any>;
	retrieve(): Promise<any>;
}

