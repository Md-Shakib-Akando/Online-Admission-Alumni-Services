"use client";


import { useAuth } from "@/app/components/Auth/AuthProvider/page";
import { useEffect, useState } from "react";

interface Payment {
    id: number;
    amount: number;
    transaction_id: string;
    status: string;
    created_at: string;
    email: string;
}

export default function PaymentHistory() {
    const { user } = useAuth();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchPayments = async () => {
            try {
                const res = await fetch(`/api/payments?email=${user.email}`);
                const data = await res.json();
                if (data.success) setPayments(data.payments);
                else setPayments([]);
            } catch (err) {
                console.error(err);
                setPayments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-white bg-blue-700">
                Loading payment history...
            </div>
        );
    }

    if (!payments.length) {
        return (
            <div className="p-6 text-center text-gray-500">
                No payments found.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Payment History</h2>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-blue-700 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Transaction ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Amount (USD)</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payments.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 text-sm">{p.transaction_id}</td>
                                <td className="px-4 py-3 text-sm">
                                    {Number(p.amount).toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <span className="px-2 py-1 rounded font-semibold bg-green-100 text-green-700">
                                        SUCCEEDED
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{p.email}</td>
                                <td className="px-4 py-3 text-sm">
                                    {new Date(p.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
