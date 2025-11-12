import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

interface Params {
    id: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
    try {
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, message: "Invalid user ID" },
                { status: 400 }
            );
        }

        await connection.execute(
            "UPDATE users SET role = 'alumni' WHERE id = ?",
            [userId]
        );

        return NextResponse.json({ success: true, message: "User promoted to alumni." });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Failed to promote user." },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, message: "Invalid user ID" },
                { status: 400 }
            );
        }

        await connection.execute("DELETE FROM users WHERE id = ?", [userId]);

        return NextResponse.json({ success: true, message: "User deleted successfully." });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Failed to delete user." },
            { status: 500 }
        );
    }
}
