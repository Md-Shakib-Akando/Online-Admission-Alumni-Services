"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import QualificationInfo from "../../qualificationTableForm/page";
import PaymentSectionWrapper from "../../PaymentSection/page";

type DepartmentMap = {
    [department: string]: string[];
};

type AcademicData = {
    [faculty: string]: {
        departments: DepartmentMap;
    };
};

type Division = { id: number; name: string };
type District = { id: number; name: string; division_id: number };
type Upazila = { id: number; name: string; district_id: number };

type DivisionApiResponse = { count: number; data: Division[]; success: boolean; message: string };
type DistrictApiResponse = { success: boolean; data: District[]; message: string; count: number; timestamp: string };
type UpazilaApiResponse = { success: boolean; data: Upazila[]; message: string; count: number; timestamp: string };

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
    studentPicture?: File;
    studentSignature?: File;
    fatherName?: string;
    fatherPhone?: string;
    motherName?: string;
    motherPhone?: string;
    village?: string;
    postOffice?: string;
    postalCode?: string;
    union?: string;
    country?: string;
    nidOrBirth?: File;
    fatherNid?: File;
    ATC?: File;
    otherDocsFile?: File;
    [key: string]: string | File | undefined;
}
interface FilesData {
    studentPicture?: string;
    studentSignature?: string;
    nidOrBirth?: string;
    fatherNid?: string;
    ATC?: string;
    otherDocsFile?: string;
}


export default function UnderGraduateForm() {
    const [formData, setFormData] = useState<FormDataType>({});

    const [transactionId, setTransactionId] = useState("");
    const [faculty, setFaculty] = useState<keyof AcademicData | "">("");
    const [department, setDepartment] = useState<keyof DepartmentMap | "">("");
    const [program, setProgram] = useState<string>("");

    const [divisions, setDivisions] = useState<Division[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [upazilas, setUpazilas] = useState<Upazila[]>([]);

    const [selectedDivision, setSelectedDivision] = useState<number | "">("");
    const [selectedDistrict, setSelectedDistrict] = useState<number | "">("");
    const [selectedUpazila, setSelectedUpazila] = useState<number | "">("");
    const formRef = useRef<HTMLFormElement>(null);
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
        "Law": {
            departments: {
                Law: ["LLB (HSC)", "LLM (1Year)", "LLM (2Year)"],
            },
        },
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (files && files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFacultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value as keyof AcademicData;
        setFaculty(selected);
        setDepartment("");
        setProgram("");
    };

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setDepartment(selected);
        setProgram("");
    };

    const handleProgramChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setProgram(e.target.value);
    };

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const res = await fetch("https://bdapis.vercel.app/geo/v2.0/divisions");
                const data: DivisionApiResponse = await res.json();
                setDivisions(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDivisions();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedDivision) {
                setDistricts([]);
                setSelectedDistrict("");
                setUpazilas([]);
                setSelectedUpazila("");
                return;
            }
            try {
                const res = await fetch(`https://bdapis.vercel.app/geo/v2.0/districts/${selectedDivision}`);
                const data: DistrictApiResponse = await res.json();
                setDistricts(data.data);
                setSelectedDistrict("");
                setUpazilas([]);
                setSelectedUpazila("");
            } catch (err) {
                console.error(err);
            }
        };
        fetchDistricts();
    }, [selectedDivision]);


    useEffect(() => {
        const fetchUpazilas = async () => {
            if (!selectedDistrict) {
                setUpazilas([]);
                setSelectedUpazila("");
                return;
            }
            try {
                const res = await fetch(`https://bdapis.vercel.app/geo/v2.0/upazilas/${selectedDistrict}`);
                const data: UpazilaApiResponse = await res.json();
                setUpazilas(data.data);
                setSelectedUpazila("");
            } catch (err) {
                console.error(err);
            }
        };
        fetchUpazilas();
    }, [selectedDistrict]);


    // Convert file to base64
    const fileToBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(",")[1]);
            reader.onerror = (err) => reject(err);
        });

    // In handleSubmit function

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const files: FilesData = {};

            // Convert files to Base64 only if they exist
            if (formData.studentPicture) files.studentPicture = await fileToBase64(formData.studentPicture);
            if (formData.studentSignature) files.studentSignature = await fileToBase64(formData.studentSignature);
            if (formData.nidOrBirth) files.nidOrBirth = await fileToBase64(formData.nidOrBirth);
            if (formData.fatherNid) files.fatherNid = await fileToBase64(formData.fatherNid);
            if (formData.ATC) files.ATC = await fileToBase64(formData.ATC);
            if (formData.otherDocsFile) files.otherDocsFile = await fileToBase64(formData.otherDocsFile);

            const response = await fetch("/api/undergraduate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    faculty,
                    department,
                    program,
                    selectedDivision,
                    selectedDistrict,
                    selectedUpazila,
                    transactionId,
                    files,
                }),
            });

            const res = await response.json();
            if (res.success) {
                alert("✅ Form submitted successfully!");
                formRef.current?.reset();
                setFormData({});
                setFaculty("");
                setDepartment("");
                setProgram("");
                setSelectedDivision("");
                setSelectedDistrict("");
                setSelectedUpazila("");
                setTransactionId("");
            } else {
                alert("❌ Submission failed: " + res.message);
            }
        } catch (err) {
            console.error(err);
            alert("❌ Submission failed! Check console for details.");
        }
    };





    return (
        <div className="max-w-10/12 mx-auto p-6  ">

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* ========== ACADEMIC INFORMATION ========== */}
                <section>
                    <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                        Academic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                        {/* Faculty */}
                        <div>
                            <label className="block text-sm font-medium">Faculty *</label>
                            <select
                                name="faculty"
                                onChange={handleFacultyChange}
                                value={faculty}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="">--- Select ---</option>
                                {Object.keys(academicData).map((f) => (
                                    <option key={f} value={f}>{f}</option>
                                ))}
                            </select>
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium">Department *</label>
                            <select
                                name="department"
                                onChange={handleDepartmentChange}
                                value={department}
                                disabled={!faculty}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="">--- Select ---</option>
                                {faculty &&
                                    Object.keys(academicData[faculty].departments).map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                            </select>
                        </div>

                        {/* Program */}
                        <div>
                            <label className="block text-sm font-medium">Program *</label>
                            <select
                                name="program"
                                onChange={handleProgramChange}
                                value={program}
                                disabled={!department}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="">--- Select ---</option>
                                {faculty && department &&
                                    academicData[faculty].departments[department].map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                            </select>
                        </div>

                    </div>
                </section>
                {/* ========== STUDENT INFORMATION ========== */}
                <section>
                    <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                        Student Information
                    </h3>
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Student&apos;s Name *</label>
                            <input
                                type="text"
                                name="studentName"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Student&apos;s Phone Number *</label>
                            <input
                                type="tel"
                                name="studentPhone"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Student&apos;s Email</label>
                            <input
                                type="email"
                                name="studentEmail"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Student&apos;s NID / Birth Certificate ID *</label>
                            <input
                                type="text"
                                name="nid"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Birth Place</label>
                            <input
                                type="text"
                                name="birthPlace"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Admission Date *</label>
                            <input
                                type="date"
                                name="admissionDate"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Blood Group</label>
                            <select name="blood" onChange={handleChange} className="w-full border rounded p-2">
                                <option value="">--- Select ---</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Religion</label>
                            <select name="religion" onChange={handleChange} className="w-full border rounded p-2">
                                <option>--- Select ---</option>
                                <option value="Islam">Islam</option>
                                <option value="Hinduism">Hinduism</option>
                                <option value="Christianity">Christianity</option>
                                <option value="Buddhism">Buddhism</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Gender</label>
                            <select name="gender" onChange={handleChange} className="w-full border rounded p-2">
                                <option value="">--- Select ---</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Marital Status</label>
                            <select name="maritalStatus" onChange={handleChange} className="w-full border rounded p-2">
                                <option value="">--- Select ---</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Nationality</label>
                            <select name="nationality" onChange={handleChange} className="w-full border rounded p-2">
                                <option>--- Select ---</option>
                                <option>Bangladesh</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Student&apos;s Picture * (300x300px)</label>
                            <input
                                type="file"
                                name="studentPicture"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Student&apos;s Signature * (300x80px)</label>
                            <input
                                type="file"
                                name="studentSignature"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* ========== PARENTS INFORMATION ========== */}
                <section>
                    <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                        Parents Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Father&apos;s Name *</label>
                            <input
                                type="text"
                                name="fatherName"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father&apos;s Phone Number</label>
                            <input
                                type="tel"
                                name="fatherPhone"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mother&apos;s Name *</label>
                            <input
                                type="text"
                                name="motherName"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mother&apos;s Phone Number</label>
                            <input
                                type="tel"
                                name="motherPhone"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                </section>

                {/* ========== PERMANENT ADDRESS ========== */}
                <section>
                    <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                        Permanent Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Village *</label>
                            <input
                                type="text"
                                name="village"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Post Office *</label>
                            <input
                                type="text"
                                name="postOffice"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Postal Code *</label>
                            <input
                                type="text"
                                name="postalCode"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Union Parishad *</label>
                            <input
                                type="text"
                                name="union"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Country *</label>
                            <select name="country" onChange={handleChange} className="w-full border rounded p-2" required>
                                <option>--- Select ---</option>
                                <option>Bangladesh</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Division *</label>
                            <select
                                value={selectedDivision}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setSelectedDivision(Number(e.target.value))
                                }
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="">--- Select ---</option>
                                {divisions.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">District *</label>
                            <select
                                value={selectedDistrict}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setSelectedDistrict(Number(e.target.value))
                                }
                                className="w-full border rounded p-2"
                                disabled={!selectedDivision}
                                required
                            >
                                <option value="">--- Select ---</option>
                                {districts.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div>
                            <label className="block text-sm font-medium">Upazila *</label>
                            <select
                                value={selectedUpazila}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                    setSelectedUpazila(Number(e.target.value))
                                }
                                className="w-full border rounded p-2"
                                disabled={!selectedDistrict}
                                required
                            >
                                <option value="">--- Select ---</option>
                                {upazilas.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                </section>
                <QualificationInfo></QualificationInfo>
                <section>
                    <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                        Necessary Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">National ID/Birth Certificate *</label>
                            <input
                                type="file"
                                name="nidOrBirth"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father & Mother National ID*</label>
                            <input
                                type="file"
                                name="fatherNid"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Academic Transcript/Certificate*</label>
                            <input
                                type="file"
                                name="ATC"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Other Documents*</label>
                            <input
                                type="file"
                                name="otherDocsFile"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />

                        </div>



                    </div>
                </section>

                <section>
                    <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                        Payment
                    </h3>

                    <div className="flex flex-col md:flex-row gap-4 w-full mt-4">




                        <div className="flex-1">
                            <label className="block font-medium mb-1">Transaction ID</label>
                            <input
                                type="text"
                                readOnly
                                value={transactionId ? transactionId : ""}
                                placeholder="Payment pending..."
                                className="w-full border rounded p-2 bg-gray-100"
                            />
                        </div>
                        <div className="flex-1">
                            <PaymentSectionWrapper setTransactionId={setTransactionId} />
                        </div>
                    </div>


                    <input type="hidden" name="transactionId" value={transactionId} />
                </section>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white px-6 py-2 rounded-lg font-semibold"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div >
    );
}
