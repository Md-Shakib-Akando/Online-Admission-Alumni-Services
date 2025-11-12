"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

interface User {
    id: number;
    name: string;
    email: string;
    role: "applicant" | "alumni" | "admin";
    student_id?: string | null;
    photo_url?: string | null;
}

interface Payment {
    id: number;
    email: string;
    amount: number;
    transaction_id: string;
    status: string;
    created_at: string;
}

export default function DashboardHome() {
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const [payments, setPayments] = useState<Payment[]>([]);
    const [loadingPayments, setLoadingPayments] = useState(true);

    // Fetch all users
    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            if (data.success) setUsers(data.users);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingUsers(false);
        }
    };

    // Fetch all payments
    const fetchPayments = async () => {
        setLoadingPayments(true);
        try {
            const res = await fetch("/api/payments");
            const data = await res.json();
            if (data.success) setPayments(data.payments);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPayments(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchPayments();
    }, []);

    // Calculate total revenue
    const totalRevenue = payments.reduce((acc, p) => acc + Number(p.amount), 0);

    // Stats cards
    const stats = [
        { title: "Total Admissions", value: users.filter(u => u.role === "applicant").length },
        { title: "Active Alumni", value: users.filter(u => u.role === "alumni").length },
        { title: "Pending Requests", value: users.filter(u => u.role === "applicant").length },
        { title: "Revenue", value: `$${totalRevenue.toLocaleString()}` },
    ];

    // Sample chart data
    const admissionData = [
        { semester: "Spring 2023", admissions: 250 },
        { semester: "Fall 2023", admissions: 170 },
        { semester: "Spring 2024", admissions: 360 },
        { semester: "Fall 2024", admissions: 280 },
        { semester: "Spring 2025", admissions: 265 },
        { semester: "Fall 2025", admissions: 290 },
    ];

    const alumniData = [
        { name: "Employed", value: 300 },
        { name: "Higher Studies", value: 150 },
        { name: "Entrepreneurs", value: 60 },
        { name: "Others", value: 30 },
    ];

    const COLORS = ["#2563EB", "#60A5FA", "#93C5FD", "#1E3A8A"];

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white shadow rounded-lg p-4 text-center border-l-4 border-blue-600 hover:scale-[1.02] transition-transform"
                    >
                        <h3 className="text-gray-500 text-sm sm:text-base">{item.title}</h3>
                        <p className="text-xl sm:text-2xl font-bold text-blue-700 mt-1">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Admissions
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={admissionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="semester" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="admissions" fill="#2563EB" barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Alumni Distribution
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={alumniData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {alumniData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Users Table without Actions */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>

                            <th className="p-3 text-left font-medium uppercase text-sm"></th>
                            <th className="p-3 text-left font-medium uppercase text-sm">Name</th>
                            <th className="p-3 text-left font-medium uppercase text-sm">Email</th>
                            <th className="p-3 text-left font-medium uppercase text-sm">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingUsers ? (
                            <tr>
                                <td colSpan={5} className="text-center p-6 text-gray-500">Loading...</td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center p-6 text-gray-500">No users found.</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-50 transition">

                                    <td className="p-3 text-gray-700">
                                        {user.photo_url ? (
                                            <Image
                                                src={user.photo_url}
                                                alt={user.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                                                N/A
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 text-gray-800 font-medium">{user.name}</td>
                                    <td className="p-3 text-gray-700">{user.email}</td>
                                    <td className="p-3 capitalize text-gray-700 font-medium">{user.role}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
