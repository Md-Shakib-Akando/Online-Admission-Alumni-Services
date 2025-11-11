"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import QualificationInfo from "../../qualificationTableForm/page";
import PaymentSectionWrapper from "../../PaymentSection/page";


type DepartmentMap = {
    [department: string]: string[]; // department → programs
};

type AcademicData = {
    [faculty: string]: {
        departments: DepartmentMap;
    };
};
type DivisionApiResponse = {
    count: number;
    data: Division[];
    success: boolean;
    message: string;
};

type DistrictApiResponse = {
    success: boolean;
    data: District[];
    message: string;
    count: number;
    timestamp: string;
};
type UpazilaApiResponse = {
    success: boolean;
    data: Upazila[];
    message: string;
    count: number;
    timestamp: string;
};




type Division = { id: number; name: string };
type District = { id: number; name: string; division_id: number };
type Upazila = { id: number; name: string; district_id: number };

export default function UnderGraduateForm() {
    const [formData, setFormData] = useState({});
    const [transactionId, setTransactionId] = useState("");
    const [faculty, setFaculty] = useState<keyof AcademicData | "">("");
    const [department, setDepartment] = useState<keyof DepartmentMap | "">("");
    const [program, setProgram] = useState<string>("");

    const [divisions, setDivisions] = useState<DivisionApiResponse | null>(null);
    const [districts, setDistricts] = useState<District[]>([]);
    const [upazilas, setUpazilas] = useState<Upazila[]>([]);

    const [selectedDivision, setSelectedDivision] = useState<number | "">("");
    const [selectedDistrict, setSelectedDistrict] = useState<number | "">("");
    const [selectedUpazila, setSelectedUpazila] = useState<number | "">("");
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
                BusinessAdministration: ["BBA ", "MBA (1Year)", "MBA (2Year)", "EMBA"],

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
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("✅ Form submitted successfully!");
        const form = e.currentTarget as HTMLFormElement;
        form.reset();
    };
    const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFaculty = e.target.value as keyof AcademicData; // important cast
        setFaculty(selectedFaculty);
        setDepartment("");
        setProgram("");
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDepartment = e.target.value;
        setDepartment(selectedDepartment);
        setProgram("");
    };

    const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProgram(e.target.value);
    };
    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const res = await fetch("https://bdapis.vercel.app/geo/v2.0/divisions");
                const data: DivisionApiResponse = await res.json();
                setDivisions(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDivisions();
    }, []);

    // Fetch districts whenever a division is selected
    // Fetch districts when a division is selected

    useEffect(() => {
        if (!selectedDivision) {
            setDistricts([]);
            setSelectedDistrict("");
            setUpazilas([]);
            setSelectedUpazila("");
            return;
        }

        const fetchDistricts = async () => {
            try {
                const res = await fetch(`https://bdapis.vercel.app/geo/v2.0/districts/${selectedDivision}`);
                if (!res.ok) throw new Error("Failed to fetch districts");
                const data: DistrictApiResponse = await res.json();
                setDistricts(data.data); // <-- only the array
                setSelectedDistrict("");
                setUpazilas([]);
                setSelectedUpazila("");
            } catch (err) {
                console.error(err);
            }
        };
        fetchDistricts();
    }, [selectedDivision]);

    // Fetch upazilas when a district is selected
    useEffect(() => {
        if (!selectedDistrict) {
            setUpazilas([]);
            setSelectedUpazila("");
            return;
        }

        const fetchUpazilas = async () => {
            try {
                const res = await fetch(`https://bdapis.vercel.app/geo/v2.0/upazilas/${selectedDistrict}`);
                if (!res.ok) throw new Error("Failed to fetch upazilas");
                const data: UpazilaApiResponse = await res.json();
                setUpazilas(data.data); // <-- only the array
                setSelectedUpazila("");
            } catch (err) {
                console.error(err);
            }
        };
        fetchUpazilas();
    }, [selectedDistrict]);



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
                                {divisions?.data.map((d) => (
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
                                name="union"
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
