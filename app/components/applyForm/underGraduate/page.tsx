"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import QualificationInfo from "../../qualificationTableForm/page";
import PaymentSectionWrapper from "../../PaymentSection/page";


export default function UnderGraduateForm() {
    const [formData, setFormData] = useState({});
    const [transactionId, setTransactionId] = useState("");

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

    return (
        <div className="max-w-10/12 mx-auto p-6  ">

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* ========== ACADEMIC INFORMATION ========== */}
                <section>
                    <h3 className="bg-sky-500 text-white p-2 rounded-md text-lg font-semibold">
                        Academic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium">Faculty *</label>
                            <select
                                name="faculty"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option>--- Select ---</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Department *</label>
                            <select
                                name="department"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option>--- Select ---</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Program *</label>
                            <select
                                name="program"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option>--- Select ---</option>
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
                                <option>--- Select ---</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Religion</label>
                            <select name="religion" onChange={handleChange} className="w-full border rounded p-2">
                                <option>--- Select ---</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Gender</label>
                            <select name="gender" onChange={handleChange} className="w-full border rounded p-2">
                                <option>--- Select ---</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Marital Status</label>
                            <select name="maritalStatus" onChange={handleChange} className="w-full border rounded p-2">
                                <option>--- Select ---</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Nationality</label>
                            <select name="nationality" onChange={handleChange} className="w-full border rounded p-2">
                                <option>--- Select ---</option>
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
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Division *</label>
                            <select name="division" onChange={handleChange} className="w-full border rounded p-2" required>
                                <option>--- Select ---</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">City *</label>
                            <input
                                type="text"
                                name="city"
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Upazila *</label>
                            <select name="upazila" onChange={handleChange} className="w-full border rounded p-2" required>
                                <option>--- Select ---</option>
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
        </div>
    );
}
