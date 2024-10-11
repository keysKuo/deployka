export type StripeItem = {
    price_data: {
        currency: "usd" | "vnd",
        product_data: {
            name: string,
            images: [string]
        },
        unit_amount: number
    };
    quantity: number
}

