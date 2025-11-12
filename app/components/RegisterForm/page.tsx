"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterForm() {
    const [role, setRole] = useState("applicant");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [studentId, setStudentId] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "/";

    const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

    // Upload image to ImgBB
    const uploadToImgBB = async (file: File): Promise<string | null> => {
        if (!imgbbKey) return null;

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data?.data?.url || null;
    };

    // Handle registration
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire("Password Mismatch", "Passwords do not match!", "error");
            return;
        }

        setLoading(true);

        try {
            let photoURL = "";

            // Upload image if selected
            if (image) {
                const uploadedUrl = await uploadToImgBB(image);
                if (uploadedUrl) photoURL = uploadedUrl;
            }

            // Create Firebase user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Update display name and photo
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: fullName,
                    photoURL,
                });
            }

            // Post to MySQL API
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: fullName,
                    email,
                    password,
                    role,
                    studentId: role === "alumni" ? studentId : null,
                    photoUrl: photoURL || "/default-avatar.png"
                }),
            });


            Swal.fire({
                icon: "success",
                title: "Registered",
                text: "You have successfully registered.",
                timer: 1000,
                showConfirmButton: false,
            });

            router.replace(from);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: (error as Error).message,
                timer: 1500,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Sign-in
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Post to MySQL API
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.displayName || "",
                    email: user.email,
                    password: "",
                    role: "applicant",
                    studentId: null,
                    photoUrl: user.photoURL || "/default-avatar.png",
                }),
            });

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Logged in with Google as Applicant!",
                timer: 1000,
                showConfirmButton: false,
            });

            router.replace(from);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: (error as Error).message,
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };

    return (
        <div className="relative backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-xl">
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
                Create an Account
            </h2>

            <form className="space-y-4 text-white" onSubmit={handleRegister}>

                <div className="flex flex-col">
                    <label className="mb-1 text-sm">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Role Selection */}
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

                {/* Student ID for Alumni */}
                {role === "alumni" && (
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm">Student ID / Registration No.</label>
                        <input
                            type="text"
                            placeholder="Your university student ID"
                            className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                    </div>
                )}

                {/* Image Upload */}
                <div className="flex flex-col">
                    <label className="mb-1 text-sm">Image</label>
                    <input
                        type="file"
                        className="w-full px-4 py-2 rounded-lg bg-white/80 text-black focus:outline-none"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-700 transition hover:cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            {/* OR Divider */}
            <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-white/40"></div>
                <span className="text-white mx-2">OR</span>
                <div className="flex-1 h-px bg-white/40"></div>
            </div>

            {/* Google Sign-in */}
            <button
                onClick={handleGoogleSignIn}
                className="w-full py-2 flex items-center justify-center gap-2 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition hover:cursor-pointer"
            >
                <FcGoogle className="text-xl" /> Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center text-white text-sm mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-sky-500 underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
