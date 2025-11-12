"use client";

import React from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";
import { FaClipboardList, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Dummy Data
const stats = [
    { title: "Applications Submitted", value: 5, icon: <FaClipboardList className="text-3xl text-blue-500" /> },
    { title: "Pending", value: 2, icon: <FaHourglassHalf className="text-3xl text-yellow-500" /> },
    { title: "Accepted", value: 1, icon: <FaCheckCircle className="text-3xl text-green-500" /> },
    { title: "Rejected", value: 2, icon: <FaTimesCircle className="text-3xl text-red-500" /> },
];

const pieData = [
    { name: "Program A", value: 3 },
    { name: "Program B", value: 2 },
];

const lineData = [
    { month: "Jan", submitted: 1, approved: 0 },
    { month: "Feb", submitted: 2, approved: 1 },
    { month: "Mar", submitted: 2, approved: 0 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

export default function ApplicantHome() {
    return (
        <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-xl transition">
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
                    <h3 className="text-gray-700 font-semibold mb-4 text-lg">Programs Applied</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
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
                    <h3 className="text-gray-700 font-semibold mb-4 text-lg">Applications Timeline</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="submitted" stroke="#8884d8" strokeWidth={3} />
                            <Line type="monotone" dataKey="approved" stroke="#82ca9d" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
