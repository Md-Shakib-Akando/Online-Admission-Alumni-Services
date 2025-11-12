
import { NextResponse } from "next/server";
import connection from "@/lib/db";

export async function GET() {
    try {

        const [rows] = await connection.query(`
            SELECT * 
            FROM certificate_requests
            ORDER BY created_at DESC
        `);


        return NextResponse.json({
            success: true,
            certificateRequests: rows
        });
    } catch (error) {
        console.error("Error fetching certificate requests:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
