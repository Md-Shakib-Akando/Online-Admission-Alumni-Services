"use client";
import React from "react";
import Link from "next/link";

export default function AllProgram() {
    return (
        <section
            className="relative bg-[url('/assets/prgmImg.jpg')] bg-cover bg-center bg-fixed py-24 md:py-32"
        >

            <div className="absolute inset-0 bg-black/80"></div>


            <div className="relative max-w-6xl mx-auto text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Academic Programs
                </h2>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12">
                    Choose The Right Program To Build Your Future
                </p>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">


                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl text-left hover:scale-[1.02] transition cursor-pointer">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                            Undergraduate Programs
                        </h3>
                        <p className="text-gray-200 text-sm mb-4">
                            Explore bachelor-level programs designed to build a strong academic foundation and professional skills.
                        </p>
                        <Link href="/programs">
                            <button className="px-5 py-2 bg-yellow-500 text-blue-900 font-semibold rounded-md hover:bg-yellow-400 transition">
                                View Programs
                            </button>
                        </Link>
                    </div>


                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl text-left hover:scale-[1.02] transition cursor-pointer">
                        <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                            Graduate Programs
                        </h3>
                        <p className="text-gray-200 text-sm mb-4">
                            Advance your academic journey with master’s degrees focused on research, leadership and professional growth.
                        </p>
                        <Link href="/programs">
                            <button className="px-5 py-2 bg-yellow-500 text-blue-900 font-semibold rounded-md hover:bg-yellow-400 transition">
                                View Programs
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
