
import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/assets/pubImg2.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[5px]"></div>


            <div className="relative backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-white mb-6">Login</h2>

                <form className="space-y-4">
                    <div className="flex flex-col text-white">
                        <label className="mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none text-black"
                        />
                    </div>

                    <div className="flex flex-col text-white">
                        <label className="mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none text-black"
                        />
                    </div>
                    <div className="flex justify-end "><Link href="#" className="hover:underline text-white">Forgot password?</Link></div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-700 hover:cursor-pointer transition"
                    >
                        Login
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

                <div className="flex justify-center text-sm text-white mt-4">
                    <Link href='/registerPage' >Don&apos;t have an account? <span className="text-sky-500 hover:underline">Register</span></Link>

                </div>
            </div>
        </div>
    );
}
