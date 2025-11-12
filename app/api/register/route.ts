import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "applicant" | "alumni" | "admin";
    student_id?: string | null;
    photo_url?: string | null;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password, role, studentId, photoUrl } = body;

        // Check if user exists
        const [rows] = await connection.query<UserRow[]>(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await connection.query(
            "INSERT INTO users (name, email, password, role, student_id, photo_url) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, hashedPassword, role, studentId || null, photoUrl || null]
        );

        return NextResponse.json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
