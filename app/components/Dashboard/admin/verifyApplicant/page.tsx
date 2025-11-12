"use client";

import { useEffect, useState } from "react";

interface Application {
    id: number;
    student_name: string;
    program: string;
    transaction_id?: string;
    status: "pending" | "approved" | "rejected";
    student_picture?: string;
    student_signature?: string;
    nid_or_birth?: string;
    father_nid?: string;
    atc?: string;
    other_docs?: string;
}

interface ApiResponse {
    success: boolean;
    applications: Application[];
    message?: string;
}

export default function VerifyApplicant() {
    const [applications, setApplications] = useState<Application[]>([]);
    console.log(applications)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await fetch("/api/applications");
                if (!res.ok) throw new Error("Failed to fetch applications");

                const data: ApiResponse = await res.json();
                setApplications(Array.isArray(data.applications) ? data.applications : []);
            } catch (err) {
                console.error("Error fetching applications:", err);
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleVerify = async (id: number, status: "approved" | "rejected") => {
        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();
            alert(data.message);

            setApplications((prev) =>
                prev.map((app) => (app.id === id ? { ...app, status } : app))
            );
        } catch (err) {
            console.error("Error updating application:", err);
        }
    };

    const handleViewDoc = (url?: string) => {
        if (!url) {
            alert("Document not available.");
            return;
        }
        window.open(url, "_blank");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-white bg-blue-700">
                Loading applications...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Applications</h2>

            {applications.length === 0 ? (
                <p className="text-center py-6 text-gray-500">No applications found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow ">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Student Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Program</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Student Picture</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Student Signature</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">NID/Birth</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Father NID</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">ATC</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Other Docs</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Status / Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 text-sm">{app.student_name}</td>
                                    <td className="px-4 py-3 text-sm">{app.program}</td>
                                    <td className="px-4 py-3 text-sm">{app.transaction_id || "Pending"}</td>
                                    {/* Document Columns */}
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            onClick={() => handleViewDoc(app.student_picture)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            onClick={() => handleViewDoc(app.student_signature)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            onClick={() => handleViewDoc(app.nid_or_birth)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            onClick={() => handleViewDoc(app.father_nid)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            onClick={() => handleViewDoc(app.atc)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            onClick={() => handleViewDoc(app.other_docs)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {app.status === "pending" ? (
                                            <div className="flex gap-2 flex-wrap">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                                                    onClick={() => handleVerify(app.id, "approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                                    onClick={() => handleVerify(app.id, "rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span
                                                className={`font-semibold px-2 py-1 rounded ${app.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {app.status.toUpperCase()}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
