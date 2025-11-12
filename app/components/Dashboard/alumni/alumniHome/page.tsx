"use client";

import React, { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";
import { FaCertificate, FaCalendarCheck, FaDonate, FaUsers } from "react-icons/fa";

interface CertificateRequest {
    id: number;
    status: "pending" | "approved" | "rejected";
    created_at: string;
    updated_at: string;
}

export default function AlumniHome() {
    const [requests, setRequests] = useState<CertificateRequest[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch certificate requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("/api/getCertificateRequest");
                const data = await res.json();

                if (data.success && Array.isArray(data.certificateRequests)) {
                    setRequests(data.certificateRequests);
                } else {
                    setRequests([]);
                }
            } catch (err) {
                console.error("Error fetching certificate requests:", err);
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    // Stats
    const totalRequests = requests.length;
    const totalApproved = requests.filter(r => r.status === "approved").length;
    const totalPending = requests.filter(r => r.status === "pending").length;
    const totalRejected = requests.filter(r => r.status === "rejected").length;

    const stats = [
        {
            title: "Certificates Requested",
            value: totalRequests,
            icon: <FaCertificate className="text-3xl text-blue-500" />,
        },
        {
            title: "Certificates Approved",
            value: totalApproved,
            icon: <FaCalendarCheck className="text-3xl text-green-500" />,
        },
        {
            title: "Pending Requests",
            value: totalPending,
            icon: <FaDonate className="text-3xl text-yellow-500" />,
        },
        {
            title: "Rejected Requests",
            value: totalRejected,
            icon: <FaUsers className="text-3xl text-red-500" />,
        },
    ];

    // Pie chart data (approved vs pending)
    const pieData = [
        { name: "Approved", value: totalApproved },
        { name: "Pending", value: totalPending },
        { name: "Rejected", value: totalRejected },
    ];

    const COLORS = ["#82ca9d", "#ffc658", "#ff7f50"];

    // Line chart data (group by month)
    const groupedByMonth = requests.reduce((acc, req) => {
        const month = new Date(req.created_at).toLocaleString("default", { month: "short" });
        if (!acc[month]) acc[month] = { month, requested: 0, issued: 0 };
        acc[month].requested += 1;
        if (req.status === "approved") acc[month].issued += 1;
        return acc;
    }, {} as Record<string, { month: string; requested: number; issued: number }>);

    const lineData = Object.values(groupedByMonth);

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-10">
            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center h-64 text-white bg-blue-700 rounded-lg">
                    Loading alumni dashboard...
                </div>
            )}

            {!loading && (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition"
                            >
                                <div>{stat.icon}</div>
                                <div className="flex flex-col">
                                    <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Pie Chart */}
                        <div className="bg-white shadow-lg rounded-xl p-6 h-[400px]">
                            <h3 className="text-gray-700 font-semibold mb-4 text-lg">
                                Certificate Request Summary
                            </h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Line Chart */}
                        <div className="bg-white shadow-lg rounded-xl p-6 h-[400px]">
                            <h3 className="text-gray-700 font-semibold mb-4 text-lg">
                                Certificates Requested vs Issued
                            </h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="requested" stroke="#8884d8" strokeWidth={3} />
                                    <Line type="monotone" dataKey="issued" stroke="#82ca9d" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
