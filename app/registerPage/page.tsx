"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
    const [role, setRole] = useState("applicant");

    return (
        <div
            className="relative min-h-screen pt-5 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/pubImg2.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[5px]"></div>

            <div className="relative backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-center text-white mb-6">Create an Account</h2>




                <form className="space-y-4 text-white">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm">Confirm Password</label>
                        <input
                            type="confirm-password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col text-white mb-4">
                        <label className="mb-1 text-sm">Select Account Type</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="applicant">Applicant (New Admission)</option>
                            <option value="alumni">Alumni (Graduated Student)</option>
                        </select>
                    </div>

                    {/* If Alumni, ask for Student ID */}
                    {role === "alumni" && (
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm">Student ID / Registration No.</label>
                            <input
                                type="text"
                                placeholder="Your university student ID"
                                className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                            />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm">Image</label>
                        <input
                            type="file"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-700 transition hover:cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-white/40"></div>
                    <span className="text-white mx-2">OR</span>
                    <div className="flex-1 h-px bg-white/40"></div>
                </div>

                <button
                    className="w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition hover:cursor-pointer"
                >
                    <FcGoogle className="text-xl " /> Continue with Google
                </button>

                <p className="text-center text-white text-sm mt-4">
                    Already have an account? <Link href="/login" className="text-sky-500 underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
