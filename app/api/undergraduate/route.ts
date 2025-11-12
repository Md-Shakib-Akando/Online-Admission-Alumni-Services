// app/api/undergraduate/route.ts
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import axios from "axios";

interface FilesData {
  studentPicture?: string;
  studentSignature?: string;
  nidOrBirth?: string;
  fatherNid?: string;
  ATC?: string;
  otherDocsFile?: string;
}

interface FormDataType {
  studentName?: string;
  studentPhone?: string;
  studentEmail?: string;
  nid?: string;
  dob?: string;
  birthPlace?: string;
  admissionDate?: string;
  blood?: string;
  religion?: string;
  gender?: string;
  maritalStatus?: string;
  nationality?: string;
  village?: string;
  postOffice?: string;
  postalCode?: string;
  union?: string;
  country?: string;
  faculty?: string;
  department?: string;
  program?: string;
  selectedDivision?: number;
  selectedDistrict?: number;
  selectedUpazila?: number;
  transactionId?: string;
  files?: FilesData;
  [key: string]: unknown;
}

export async function POST(req: NextRequest) {
  try {
    const data: FormDataType = await req.json();
    const files: FilesData = data.files || {};

    console.log("Received form data:", data);

    // Upload Base64 files to ImgBB
    const uploadFile = async (fileBase64: string) => {
      const formData = new URLSearchParams();
      formData.append("key", process.env.NEXT_PUBLIC_IMGBB_KEY!);
      formData.append("image", fileBase64);

      const res = await axios.post("https://api.imgbb.com/1/upload", formData);
      return res.data.data.url as string;
    };

    // Upload all files in parallel
    const [
      studentPictureUrl,
      studentSignatureUrl,
      nidOrBirthUrl,
      fatherNidUrl,
      ATCUrl,
      otherDocsUrl
    ] = await Promise.all([
      files.studentPicture ? uploadFile(files.studentPicture) : null,
      files.studentSignature ? uploadFile(files.studentSignature) : null,
      files.nidOrBirth ? uploadFile(files.nidOrBirth) : null,
      files.fatherNid ? uploadFile(files.fatherNid) : null,
      files.ATC ? uploadFile(files.ATC) : null,
      files.otherDocsFile ? uploadFile(files.otherDocsFile) : null
    ]);

    // Connect to MySQL
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    // Insert query
    const query = `
      INSERT INTO applications
      (faculty, department, program, student_name, student_phone, student_email, nid, dob, birth_place, admission_date, blood, religion, gender, marital_status, nationality, village, post_office, postal_code, union_parishad, country, division_id, district_id, upazila_id, transaction_id, student_picture, student_signature, nid_or_birth, father_nid, atc, other_docs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.faculty || null,
      data.department || null,
      data.program || null,
      data.studentName || null,
      data.studentPhone || null,
      data.studentEmail || null,
      data.nid || null,
      data.dob || null,
      data.birthPlace || null,
      data.admissionDate || null,
      data.blood || null,
      data.religion || null,
      data.gender || null,
      data.maritalStatus || null,
      data.nationality || null,
      data.village || null,
      data.postOffice || null,
      data.postalCode || null,
      typeof data.union === "string" ? data.union : null,
      data.country || null,
      data.selectedDivision || null,
      data.selectedDistrict || null,
      data.selectedUpazila || null,
      data.transactionId || null,
      studentPictureUrl,
      studentSignatureUrl,
      nidOrBirthUrl,
      fatherNidUrl,
      ATCUrl,
      otherDocsUrl,
      'pending'
    ];

    await connection.execute(query, values);
    await connection.end();

    return NextResponse.json({ success: true, message: "Form submitted successfully!" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error inserting form data:", error.message);
      return NextResponse.json({ success: false, message: error.message });
    }
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong!" });
  }
}
