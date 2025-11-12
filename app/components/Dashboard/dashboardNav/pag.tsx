"use client";
import React from "react";
import { FaBars } from "react-icons/fa";

interface DashboardNavProps {
    setSidebarOpen: (open: boolean) => void;
}

export default function DashboardNav({ setSidebarOpen }: DashboardNavProps) {
    return (
        <header className="w-full bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-blue-700 text-2xl lg:hidden"
                >
                    <FaBars />
                </button>
                <h1 className="text-xl font-bold text-blue-700">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">

                <span className="hidden sm:block font-semibold text-gray-600">
                    Admin
                </span>
            </div>
        </header>
    );
}
