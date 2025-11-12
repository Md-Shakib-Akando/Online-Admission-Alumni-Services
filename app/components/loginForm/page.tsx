"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/lib/firebase";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const from = searchParams.get("from") || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Login successful!",
                timer: 1000,
                showConfirmButton: false,
            });

            router.replace(from);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Login failed";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
                timer: 1000,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Logged in with Google!",
                timer: 1000,
                showConfirmButton: false,
            });

            router.replace(from);
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : "Google login failed";

            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
                timer: 1000,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="relative backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
                Login
            </h2>


            <form className="space-y-4" onSubmit={handleLogin}>
                <div className="flex flex-col text-white">
                    <label className="mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col text-white">
                    <label className="mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-end ">
                    <Link href="#" className="hover:underline text-white">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-700 hover:cursor-pointer transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-white/40"></div>
                <span className="text-white mx-2">OR</span>
                <div className="flex-1 h-px bg-white/40"></div>
            </div>


            <button
                onClick={handleGoogleSignIn}
                className="w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition hover:cursor-pointer"
            >
                <FcGoogle className="text-xl " /> Continue with Google
            </button>

            <div className="flex justify-center text-sm text-white mt-4">
                <Link href="/registerPage">
                    Don&apos;t have an account?{" "}
                    <span className="text-sky-500 hover:underline">Register</span>
                </Link>
            </div>
        </div>
    );
}
