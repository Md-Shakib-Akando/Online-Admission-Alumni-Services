import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-10-29.clover",
});

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: unknown) {
        let message = "Unknown error";
        if (error instanceof Error) message = error.message;
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
