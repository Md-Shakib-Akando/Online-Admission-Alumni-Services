"use client";

import { useEffect, useState } from "react";

interface CertificateRequest {
    id: number;
    fullName: string;
    studentId: string;
    degreeName: string;
    certificateType: string;
    paymentRef?: string;
    paymentDate?: string;
    status: "pending" | "approved" | "rejected";
}



export default function CertificateRequests() {
    const [requests, setRequests] = useState<CertificateRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("/api/getCertificateRequest");
                if (!res.ok) throw new Error("Failed to fetch requests");
                const data = await res.json();
                setRequests(Array.isArray(data.certificateRequests) ? data.certificateRequests : []);
                ;
            } catch (err) {
                console.error("Error fetching requests:", err);
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleVerify = async (id: number, status: "approved" | "rejected") => {
        try {
            const res = await fetch(`/api/certificate-requests/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            alert(data.message);

            setRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status } : req))
            );
        } catch (err) {
            console.error("Error updating request:", err);
        }
    };



    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-white bg-blue-700">
                Loading certificate requests...
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Certificate Requests</h2>

            {requests.length === 0 ? (
                <p className="text-center py-6 text-gray-500">No certificate requests found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow ">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Student Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Student ID</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Program</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Certificate Type</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Payment Ref</th>


                                <th className="px-4 py-3 text-left text-sm font-semibold">Status </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 text-sm">{req.fullName}</td>
                                    <td className="px-4 py-3 text-sm">{req.studentId}</td>
                                    <td className="px-4 py-3 text-sm">{req.degreeName}</td>
                                    <td className="px-4 py-3 text-sm">{req.certificateType}</td>
                                    <td className="px-4 py-3 text-sm">{req.paymentRef || "Pending"}</td>






                                    <td className="px-4 py-3 text-sm">
                                        {req.status === "pending" ? (
                                            <div className="flex gap-2 flex-wrap">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                                                    onClick={() => handleVerify(req.id, "approved")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                                    onClick={() => handleVerify(req.id, "rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span
                                                className={`font-semibold px-2 py-1 rounded ${req.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {req.status.toUpperCase()}
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
