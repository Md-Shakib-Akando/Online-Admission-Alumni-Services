import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            fullName,
            studentId,
            faculty,
            department,
            degreeName,
            session,
            passingYear,
            dob,
            email,
            mobile,
            nid,
            cgpa,
            graduationDate,
            certificateType,
            clearanceStatus,
            paymentStatus,
            paymentRef,
            paymentDate,
        } = body;

        const query = `
            INSERT INTO certificate_requests 
            (fullName, studentId, faculty, department, degreeName, session, passingYear, dob, email, mobile, nid, cgpa, graduationDate, certificateType, clearanceStatus, paymentStatus, paymentRef, paymentDate, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        `;
        await connection.query(query, [
            fullName,
            studentId,
            faculty,
            department,
            degreeName,
            session,
            passingYear,
            dob || null,
            email,
            mobile,
            nid || null,
            cgpa,
            graduationDate,
            certificateType,
            clearanceStatus ? 1 : 0,
            paymentStatus ? 1 : 0,
            paymentRef || null,
            paymentDate || null,
        ]);

        return NextResponse.json({ message: "Certificate request submitted successfully!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
