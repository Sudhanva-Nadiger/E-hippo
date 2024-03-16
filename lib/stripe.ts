import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
})