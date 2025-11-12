// app/api/undergraduate/route.ts
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
    try {
        // Connect to MySQL
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });

        // Fetch all applications
        const [rows] = await connection.execute(
            `SELECT * FROM applications ORDER BY id DESC`
        );

        await connection.end();

        return NextResponse.json({ success: true, applications: rows });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching applications:", error.message);
            return NextResponse.json({ success: false, message: error.message });
        }
        console.error("Unexpected error:", error);
        return NextResponse.json({ success: false, message: "Something went wrong!" });
    }
}
