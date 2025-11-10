"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

interface Qualification {
    certificate: string;
    subject: string;
    year: string;
    board: string;
    grade: string;
    gpa: string;
}

export default function QualificationInfo() {
    const [rows, setRows] = useState<Qualification[]>([
        { certificate: "", subject: "", year: "", board: "", grade: "", gpa: "" },
    ]);

    const addRow = () => {
        setRows([
            ...rows,
            { certificate: "", subject: "", year: "", board: "", grade: "", gpa: "" },
        ]);
    };

    const removeRow = (index: number) => {
        const updated = [...rows];
        updated.splice(index, 1);
        setRows(updated);
    };

    const handleChange = (
        index: number,
        field: keyof Qualification,
        value: string
    ) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    return (
        <div className="mt-6 border border-gray-300 rounded-md overflow-hidden">
            {/* Header */}
            <div className="bg-sky-600 text-white font-semibold px-4 py-2 text-sm sm:text-base">
                QUALIFICATION INFORMATION
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-xs sm:text-sm">
                            <th className="border px-2 py-1 w-10 sm:w-12">SL.</th>
                            <th className="border px-2 py-1">CERTIFICATE / DEGREE *</th>
                            <th className="border px-2 py-1">
                                SUBJECT / GROUP / DEPARTMENT *
                            </th>
                            <th className="border px-2 py-1">PASSING YEAR *</th>
                            <th className="border px-2 py-1">BOARD / UNIVERSITY *</th>
                            <th className="border px-2 py-1">GRADE / DIVISION *</th>
                            <th className="border px-2 py-1">GPA / CGPA / MARKS% *</th>
                            <th className="border px-2 py-1">OPTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, i) => (
                            <tr key={i} className="text-xs sm:text-sm">
                                <td className="border text-center py-1">{i + 1}</td>
                                <td className="border px-1">
                                    <input
                                        type="text"
                                        className="w-full border rounded-sm px-2 py-1 text-xs sm:text-sm focus:outline-none"
                                        value={row.certificate}
                                        onChange={(e) =>
                                            handleChange(i, "certificate", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="border px-1">
                                    <input
                                        type="text"
                                        className="w-full border rounded-sm px-2 py-1 text-xs sm:text-sm focus:outline-none"
                                        value={row.subject}
                                        onChange={(e) =>
                                            handleChange(i, "subject", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="border px-1">
                                    <input
                                        type="text"
                                        className="w-full border rounded-sm px-2 py-1 text-xs sm:text-sm focus:outline-none"
                                        value={row.year}
                                        onChange={(e) => handleChange(i, "year", e.target.value)}
                                    />
                                </td>
                                <td className="border px-1">
                                    <input
                                        type="text"
                                        className="w-full border rounded-sm px-2 py-1 text-xs sm:text-sm focus:outline-none"
                                        value={row.board}
                                        onChange={(e) => handleChange(i, "board", e.target.value)}
                                    />
                                </td>
                                <td className="border px-1">
                                    <input
                                        type="text"
                                        className="w-full border rounded-sm px-2 py-1 text-xs sm:text-sm focus:outline-none"
                                        value={row.grade}
                                        onChange={(e) => handleChange(i, "grade", e.target.value)}
                                    />
                                </td>
                                <td className="border px-1 py-2">
                                    <input
                                        type="text"
                                        className="w-full border rounded-sm px-2 py-1 text-xs sm:text-sm focus:outline-none"
                                        value={row.gpa}
                                        onChange={(e) => handleChange(i, "gpa", e.target.value)}
                                    />
                                </td>
                                <td className="border text-center">
                                    {i === 0 ? (
                                        <button
                                            type="button"
                                            onClick={addRow}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            <FiPlus size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => removeRow(i)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <RxCross2 size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
