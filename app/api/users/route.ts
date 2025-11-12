// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    role: "applicant" | "alumni" | "admin";
    student_id?: string | null;
    photo_url?: string | null;
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get("email");

        let query = "SELECT id, name, email, role, student_id, photo_url FROM users";
        const params: (string | null)[] = [];

        if (email) {
            query += " WHERE email = ?";
            params.push(email);
        }

        const [rows] = await connection.query<UserRow[]>(query, params);

        return NextResponse.json({
            success: true,
            users: rows, // array of users, or single user if filtered by email
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
