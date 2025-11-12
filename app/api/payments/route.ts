// app/api/payments/route.ts
import { NextResponse } from "next/server";
import connection from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";

interface PaymentRow extends RowDataPacket {
    id: number;
    email: string;
    amount: number;
    transaction_id: string;
    status: string;
    created_at: string;
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get("email"); // optional

        let query = `
            SELECT id, email, amount, transaction_id, status, created_at
            FROM payments
        `;
        const values: (string | number)[] = [];

        if (email) {
            query += " WHERE email = ?";
            values.push(email);
        }

        query += " ORDER BY created_at DESC";

        // Execute query and cast to PaymentRow[]
        const [rows] = await connection.query<PaymentRow[]>(query, values);

        return NextResponse.json({ success: true, payments: rows });
    } catch (err: unknown) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: err instanceof Error ? err.message : "Server error" },
            { status: 500 }
        );
    }
}
