"use client";

import { useAuth } from "@/app/components/Auth/AuthProvider/page";
import { useEffect, useState } from "react";


interface Application {
    id: number;
    student_name: string;
    student_email: string;
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

export default function Applications() {
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        const fetchApplications = async () => {
            try {
                const res = await fetch("/api/applications");
                if (!res.ok) throw new Error("Failed to fetch applications");

                const data: ApiResponse = await res.json();
                // Filter only applications for the logged-in user
                const userApps = Array.isArray(data.applications)
                    ? data.applications.filter((app) => app.student_email === user.email)
                    : [];

                setApplications(userApps);
            } catch (err) {
                console.error("Error fetching applications:", err);
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user?.email]);

    const handleViewDoc = (url?: string) => {
        if (!url) return alert("Document not available.");
        window.open(url, "_blank");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-white bg-blue-700">
                Loading your applications...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Applications</h2>

            {applications.length === 0 ? (
                <p className="text-center py-6 text-gray-500">No applications found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow ">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Program</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Student Picture</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Student Signature</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">NID/Birth</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Father NID</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">ATC</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Other Docs</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 text-sm">{app.program}</td>
                                    <td className="px-4 py-3 text-sm">{app.transaction_id || "Pending"}</td>
                                    {["student_picture", "student_signature", "nid_or_birth", "father_nid", "atc", "other_docs"].map((key) => (
                                        <td key={key} className="px-4 py-3 text-sm">
                                            <button
                                                onClick={() => handleViewDoc(app[key as keyof Application] as string)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition"
                                            >
                                                View
                                            </button>
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 text-sm">
                                        <span
                                            className={`font-semibold px-2 py-1 rounded ${app.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : app.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {app.status.toUpperCase()}
                                        </span>
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
