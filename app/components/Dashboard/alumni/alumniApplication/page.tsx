"use client";

import { useAuth } from "@/app/components/Auth/AuthProvider/page";
import React, { useEffect, useState } from "react";

interface CertificateRequest {
    id: number;
    fullName: string;
    studentId: string;
    faculty: string;
    department: string;
    degreeName: string;
    session: string;
    passingYear: string;
    certificateType: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
    updated_at: string;
    email: string; // make sure API returns this
}

interface ApiResponse {
    success: boolean;
    certificateRequests: CertificateRequest[];
    message?: string;
}

export default function AlumniApplication() {
    const { user } = useAuth();
    const [requests, setRequests] = useState<CertificateRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchRequests = async () => {
            try {
                const res = await fetch("/api/getCertificateRequest");
                if (!res.ok) throw new Error("Failed to fetch certificate requests");

                const data: ApiResponse = await res.json();

                // Use the correct field from your API
                const userRequests = Array.isArray(data.certificateRequests)
                    ? data.certificateRequests.filter((r) => r.email === user.email)
                    : [];

                setRequests(userRequests);
            } catch (err) {
                console.error("Error fetching certificate requests:", err);
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-white bg-blue-700 rounded-lg">
                Loading your certificate requests...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Certificate Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center py-6 text-gray-500">No requests found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Certificate</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Degree</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Session</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Passing Year</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Requested At</th>


                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 text-sm">{req.certificateType}</td>
                                    <td className="px-4 py-3 text-sm">{req.degreeName}</td>
                                    <td className="px-4 py-3 text-sm">{req.session}</td>
                                    <td className="px-4 py-3 text-sm">{req.passingYear}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span
                                            className={`font-semibold px-2 py-1 rounded ${req.status === "approved"
                                                ? "bg-green-100 text-green-700"
                                                : req.status === "rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {req.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{new Date(req.created_at).toLocaleDateString()}</td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
