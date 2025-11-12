"use client";

import ProtectedRoute from "@/app/components/Auth/ProtectedRoute/page";
import PaymentSectionWrapper from "@/app/components/PaymentSection/page";
import { ChangeEvent, FormEvent, useState } from "react";

type DepartmentMap = {
    [department: string]: string[];
};

type AcademicData = {
    [faculty: string]: {
        departments: DepartmentMap;
    };
};

const academicData: AcademicData = {
    "Science & Engineering": {
        departments: {
            "Computer Science & Engineering": ["BSc in CSE (HSC)", "BSc in CSE (Diploma)"],
            "Electrical & Electronic Engineering": ["BSc in EEE (HSC)", "BSc in EEE (Diploma)"],
            "Civil & Engineering": ["BSc in Civil (HSC)", "BSc in Civil (Diploma)"],
            "Public Health": ["MPH"],
        },
    },
    "Business Studies": {
        departments: {
            BusinessAdministration: ["BBA", "MBA (1Year)", "MBA (2Year)", "EMBA"],
        },
    },
    "Humanities & Social Science": {
        departments: {
            IslamicStudies: ["BA Hons", "MA (1Year)", "MA (2Year)"],
            English: ["BA Hons in English", "MA in English"],
            Bangla: ["BA Hons in Bangla"],
            Education: ["B.Ed", "M.Ed"],
        },
    },
    Law: {
        departments: {
            Law: ["LLB (HSC)", "LLM (1Year)", "LLM (2Year)"],
        },
    },
};

export default function CertificateRequestForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        studentId: "",
        faculty: "",
        department: "",
        degreeName: "",
        session: "",
        passingYear: "",
        dob: "",
        email: "",
        mobile: "",
        nid: "",
        cgpa: "",
        graduationDate: "",
        certificateType: "",
        clearanceStatus: false,
        paymentStatus: false,
        paymentRef: "",
        paymentDate: "",
    });

    const [faculty, setFaculty] = useState("");
    const [department, setDepartment] = useState("");
    const [program, setProgram] = useState("");
    const [transactionId, setTransactionId] = useState("");

    const certificateTypes = ["Original Certificate", "Provisional Certificate", "Transcript Copy"];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            setFormData({
                ...formData,
                [name]: e.target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFacultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedFaculty = e.target.value;
        setFaculty(selectedFaculty);
        setDepartment("");
        setProgram("");
        setFormData({
            ...formData,
            faculty: selectedFaculty,
            department: "",
            degreeName: "",
        });
    };

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedDepartment = e.target.value;
        setDepartment(selectedDepartment);
        setProgram("");
        setFormData({
            ...formData,
            department: selectedDepartment,
            degreeName: "",
        });
    };

    const handleProgramChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedProgram = e.target.value;
        setProgram(selectedProgram);
        setFormData({
            ...formData,
            degreeName: selectedProgram,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Add the transactionId from payment section into formData
        const payload = { ...formData, paymentRef: transactionId };

        try {
            const res = await fetch("/api/certificate-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ " + data.message);
                // Reset form
                setFormData({
                    fullName: "",
                    studentId: "",
                    faculty: "",
                    department: "",
                    degreeName: "",
                    session: "",
                    passingYear: "",
                    dob: "",
                    email: "",
                    mobile: "",
                    nid: "",
                    cgpa: "",
                    graduationDate: "",
                    certificateType: "",
                    clearanceStatus: false,
                    paymentStatus: false,
                    paymentRef: "",
                    paymentDate: "",
                });
                setFaculty("");
                setDepartment("");
                setProgram("");
                setTransactionId("");
            } else {
                alert("❌ " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("❌ Something went wrong. Please try again.");
        }
    };

    const departments = faculty ? Object.keys(academicData[faculty].departments) : [];
    const programs = faculty && department ? academicData[faculty].departments[department] : [];

    return (
        <ProtectedRoute>
            <div>
                <h2 className="text-2xl font-bold text-center text-white mb-2 p-4 bg-green-700">
                    Apply For Certificate
                </h2>
                <div className="max-w-10/12 mx-auto p-6">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Personal Info */}
                        <section>
                            <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                                <div className="flex flex-col">
                                    <label htmlFor="fullName">Full Name *</label>
                                    <input id="fullName" type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="studentId">Student ID / Roll No *</label>
                                    <input id="studentId" type="text" name="studentId" placeholder="Student ID" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="faculty">Faculty *</label>
                                    <select id="faculty" name="faculty" value={faculty} onChange={handleFacultyChange} className="w-full border rounded p-2" required>
                                        <option value="">Select Faculty</option>
                                        {Object.keys(academicData).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="department">Department *</label>
                                    <select id="department" name="department" value={department} onChange={handleDepartmentChange} className="w-full border rounded p-2" required disabled={!faculty}>
                                        <option value="">Select Department</option>
                                        {departments.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="degreeName">Program / Degree *</label>
                                    <select id="degreeName" name="degreeName" value={program} onChange={handleProgramChange} className="w-full border rounded p-2" required disabled={!department}>
                                        <option value="">Select Program</option>
                                        {programs.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="session">Session *</label>
                                    <input id="session" type="text" name="session" placeholder="e.g., 2018–2019" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="passingYear">Passing Year *</label>
                                    <input id="passingYear" type="number" name="passingYear" placeholder="Passing Year" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email">Email Address *</label>
                                    <input id="email" type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="mobile">Mobile Number *</label>
                                    <input id="mobile" type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="nid">National ID (optional)</label>
                                    <input id="nid" type="text" name="nid" placeholder="NID" onChange={handleChange} className="w-full border rounded p-2" />
                                </div>
                            </div>
                        </section>

                        {/* Academic & Certificate Details */}
                        <section>
                            <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">Certificate Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="flex flex-col">
                                    <label htmlFor="cgpa">Result / CGPA *</label>
                                    <input id="cgpa" type="text" name="cgpa" placeholder="CGPA" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="graduationDate">Graduation Date *</label>
                                    <input id="graduationDate" type="date" name="graduationDate" onChange={handleChange} className="w-full border rounded p-2" required />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="certificateType">Certificate Type *</label>
                                    <select id="certificateType" name="certificateType" onChange={handleChange} className="w-full border rounded p-2" required>
                                        <option value="">Select Certificate Type</option>
                                        {certificateTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Clearance & Payment */}
                        <section>
                            <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                                Clearance & Payment
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="clearanceStatus"
                                        checked={formData.clearanceStatus}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                clearanceStatus: e.target.checked,
                                                paymentStatus: false,
                                                paymentRef: "",
                                                paymentDate: "",
                                            });
                                        }}
                                    />
                                    Clearance Ok
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="paymentStatus"
                                        checked={formData.paymentStatus}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                paymentStatus: e.target.checked,
                                                clearanceStatus: false,
                                                paymentRef: "",
                                                paymentDate: "",
                                            });
                                        }}
                                    />
                                    Payment Status
                                </label>

                                {formData.paymentStatus && (
                                    <>
                                        <div className="flex flex-col w-full">
                                            <label className="block font-medium mb-1">Transaction ID</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value={transactionId}
                                                placeholder="Payment pending..."
                                                className="w-full border rounded p-2 bg-gray-100"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <PaymentSectionWrapper setTransactionId={setTransactionId} />
                                        </div>

                                        <input type="hidden" name="transactionId" value={transactionId} />
                                    </>
                                )}
                            </div>
                        </section>

                        <div className="flex justify-center mt-6">
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ProtectedRoute>
    );
}
