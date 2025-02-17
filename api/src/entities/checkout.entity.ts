import { Types } from "mongoose"

export enum CheckoutStatus {
    COMPLETED = 'completed',
    PENDING = 'pending',
    CANCELLED = 'cancelled'
}

export enum PaymentMethod {
    STRIPE = 'stripe',
    PAYPAL = 'paypal',
    MOMO = 'momo',
    ZALOPAY = 'zalopay',
}


export type Checkout = {
    _id: Types.ObjectId;
    transactionId: string;
    cartId: string,
    user: Types.ObjectId;
    paymentMethod: PaymentMethod;
    total: number;
    tax: number;
    discount?: number;
    status: CheckoutStatus
}

export type CheckoutForm = Omit<Checkout, '_id' | 'tax' | 'status'> 