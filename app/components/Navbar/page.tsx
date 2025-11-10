"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/pundra varsity logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);


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
                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="/" className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg">
                        Home
                    </Link>

                    <Link href='/admission' className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg cursor-pointer">
                        Admission
                    </Link>




                    <Link href='/alumni' className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg cursor-pointer">
                        Alumni Services
                    </Link>



                    <Link href="/about" className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg">
                        About Us
                    </Link>
                </nav>

                {/* Login Button */}
                <div className="hidden md:block">
                    <Link
                        href="/login"
                        className="ml-6 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-blue-900 px-4 py-1 rounded-md transition font-semibold"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-blue-900 focus:outline-none z-50"
                >
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-72 md:w-80 bg-blue-900 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    <div className="flex p-4 border-b border-blue-700">
                        <div className="flex items-center gap-2">
                            <Image src={logo} alt="Logo" width={40} height={40} />
                            <div className="flex flex-col gap-0">
                                <span className="font-bold text-lg text-white">Pundra University</span>
                                <span className="text-sm font-bold text-white">Of Science & Technology</span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-6 p-8 mt-4">
                        <Link href="/" className="text-white hover:text-yellow-400 transition font-semibold text-lg" onClick={() => setMenuOpen(false)}>Home</Link>

                        <Link href='/admission' className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg cursor-pointer">
                            Admission
                        </Link>




                        <Link href='/alumni' className="text-blue-900 hover:text-yellow-400 transition font-semibold text-lg cursor-pointer">
                            Alumni Services
                        </Link>

                        <Link href="/about" className="text-white hover:text-yellow-400 transition font-semibold text-lg" onClick={() => setMenuOpen(false)}>About Us</Link>
                        <Link href="/login" className="mt-8 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 px-4 py-2 rounded-md transition font-semibold text-center" onClick={() => setMenuOpen(false)}>Login</Link>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {menuOpen && <div onClick={() => setMenuOpen(false)} className="fixed inset-0 backdrop-blur-[5px] bg-black/5 z-30"></div>}
        </header>
    );
}
