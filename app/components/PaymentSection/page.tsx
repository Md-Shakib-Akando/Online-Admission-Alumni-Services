"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useAuth } from "../Auth/AuthProvider/page";


interface PaymentSectionProps {
    setTransactionId: (id: string) => void;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = ({ setTransactionId }: PaymentSectionProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<string>("");
    const [transaction, setTransaction] = useState<string>("");

    const handlePayment = async () => {
        if (!stripe || !elements) return;
        if (!user?.email) return alert("User not logged in");

        const numericAmount = Number(amount);
        if (!numericAmount || numericAmount <= 0) return alert("Enter a valid amount");

        setLoading(true);

        try {
            // 1️⃣ Create PaymentIntent
            const res = await fetch("/api/stripe/payment_intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: numericAmount, email: user.email }),
            });

            const data = await res.json();
            const clientSecret = data.clientSecret;

            if (!clientSecret) {
                alert("Payment initiation failed");
                setLoading(false);
                return;
            }

            // 2️⃣ Confirm Card Payment
            const cardNumber = elements.getElement(CardNumberElement);
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardNumber! },
            });

            if (result.error) {
                alert(result.error.message);
            } else if (result.paymentIntent?.status === "succeeded") {
                const transactionId = result.paymentIntent.id;
                setTransaction(transactionId);
                setTransactionId(transactionId);
                alert(`✅ Payment Successful! Transaction ID: ${transactionId}`);
            }
        } catch (err) {
            console.error(err);
            alert("Payment failed. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-4 bg-white rounded shadow-md p-4">
            <div>
                <label className="block font-medium mb-1">Amount (USD)</label>
                <input
                    type="number"
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border rounded p-2"
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Card Number</label>
                <div className="border rounded p-2">
                    <CardNumberElement options={{ showIcon: true }} />
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex-1">
                    <label className="block font-medium mb-1">Expiry</label>
                    <div className="border rounded p-2"><CardExpiryElement /></div>
                </div>
                <div className="flex-1">
                    <label className="block font-medium mb-1">CVC</label>
                    <div className="border rounded p-2"><CardCvcElement /></div>
                </div>
            </div>

            <button
                type="button"
                onClick={handlePayment}
                disabled={!stripe || loading}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg mt-2"
            >
                {loading ? "Processing..." : "Pay"}
            </button>
        </div>
    );
};

export default function PaymentSectionWrapper({ setTransactionId }: PaymentSectionProps) {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm setTransactionId={setTransactionId} />
        </Elements>
    );
}
