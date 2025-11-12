"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/pundra varsity logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider/page";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "@/lib/firebase";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            setProfileDropdown(false);
            await signOut(auth);
            Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have successfully logged out.",
                timer: 1000,
                showConfirmButton: false,
            });
            router.push("/login");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Logout failed";
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
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-300 shadow-sm">
            <div className="flex justify-between items-center py-3 px-4 md:px-8 xl:max-w-11/12 mx-auto">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image src={logo} alt="Logo" width={60} height={60} />
                    <div className="flex flex-col gap-0">
                        <span className="font-bold text-2xl text-blue-900">Pundra University</span>
                        <span className="text-sm font-bold text-blue-900">Of Science & Technology</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-6 items-center">
                    <Link href="/" className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg">Home</Link>
                    <Link href="/admission" className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg">Admission</Link>
                    <Link href="/alumni" className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg">Alumni Services</Link>
                    <Link href="/about" className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg">About Us</Link>
                </nav>

                {/* Desktop Right Section */}
                <div className="hidden lg:flex items-center gap-4 relative">
                    {user ? (
                        <>
                            <div className="relative">
                                <Image
                                    src={user.photoURL || "/default-avatar.png"}
                                    width={40}
                                    height={40}
                                    alt="Profile"
                                    className="rounded-full border-2 border-yellow-500 cursor-pointer"
                                    unoptimized
                                    onClick={() => setProfileDropdown(!profileDropdown)}
                                />
                                {/* Dropdown */}
                                {profileDropdown && (
                                    <div className="absolute -right-6 mt-2 w-40 border border-sky-500  bg-white shadow-xl rounded-md py-2 z-50">
                                        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 font-semibold  text-center text-gray-800">Dashboard</Link>
                                        <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 font-semibold text-center text-gray-800">Settings</Link>
                                        <div className="flex justify-center mt-5">
                                            <button
                                                onClick={handleLogout}
                                                className=" text-left px-2 py-1 border border-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer  text-red-500 font-semibold rounded"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-blue-900 px-4 py-1 rounded-md transition font-semibold"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-blue-900 focus:outline-none z-50">
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-blue-900 z-40 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full p-6 text-white font-semibold text-lg mt-8">

                    {/* Profile on mobile */}
                    {user && (
                        <>
                            <div className="flex flex-col items-center mb-6">
                                <Image
                                    src={user.photoURL || "/default-avatar.png"}
                                    width={70}
                                    height={70}
                                    alt="profile"
                                    className="rounded-full border-2 border-yellow-400"
                                />
                                <span className="mt-2 text-yellow-300 text-sm">{user.displayName || "User"}</span>
                            </div>
                            <div className="border border-amber-700">

                            </div>
                            <div className="mt-4">
                                <Link onClick={() => setMenuOpen(false)} href="/dashboard" className="mt-4  text-yellow-400 hover:bg-yellow-400 hover:text-blue-900  py-2 rounded-md text-center">
                                    Dashboard
                                </Link>
                            </div>
                        </>
                    )}

                    <Link onClick={() => setMenuOpen(false)} href="/">Home</Link>
                    <Link onClick={() => setMenuOpen(false)} href="/admission">Admission</Link>
                    <Link onClick={() => setMenuOpen(false)} href="/alumni">Alumni Services</Link>
                    <Link onClick={() => setMenuOpen(false)} href="/about">About Us</Link>

                    {/* Dashboard & Login/Logout on mobile */}
                    {user ? (
                        <>

                            <button
                                onClick={() => { handleLogout(); setMenuOpen(false); }}
                                className="mt-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-blue-900 px-4 py-2 rounded-md text-center"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="mt-4 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 px-4 py-2 rounded-md text-center"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30"></div>}
        </header>
    );
}
