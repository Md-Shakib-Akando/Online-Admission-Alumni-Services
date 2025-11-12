import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const appId = Number(params.id);
    if (isNaN(appId)) return NextResponse.json({ success: false, message: "Invalid ID" });

    try {
        const data = await req.json();
        const { status } = data; // expected: 'approved' or 'rejected'

        if (!["approved", "rejected"].includes(status)) {
            return NextResponse.json({ success: false, message: "Invalid status value" });
        }

        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        await connection.execute(`UPDATE applications SET status = ? WHERE id = ?`, [status, appId]);
        await connection.end();

        // Optionally: send email/SMS here

        return NextResponse.json({ success: true, message: `Application ${status} successfully.` });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return NextResponse.json({ success: false, message: err.message });
        }
        console.error("Unexpected error:", err);
        return NextResponse.json({ success: false, message: "Something went wrong!" });
    }
}
