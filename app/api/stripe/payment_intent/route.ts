import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connection from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-10-29.clover",
});

export async function POST(req: NextRequest) {
    try {
        const { amount, email } = await req.json();

        if (!amount || !email) {
            return NextResponse.json(
                { error: "Amount and email are required" },
                { status: 400 }
            );
        }

        // Create PaymentIntent (Stripe expects cents)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // USD to cents
            currency: "usd",
            metadata: { email },
        });

        // Save to MySQL
        const query = `
            INSERT INTO payments (email, amount, transaction_id, status, created_at)
            VALUES (?, ?, ?, ?, NOW())
        `;
        await connection.query(query, [
            email,
            amount,
            paymentIntent.id,
            paymentIntent.status,
        ]);

        return NextResponse.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            transactionId: paymentIntent.id,
        });
    } catch (error: unknown) {
        console.error("Payment error:", error);
        let message = "Unknown error";
        if (error instanceof Error) message = error.message;
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
