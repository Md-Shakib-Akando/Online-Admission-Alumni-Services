"use client";

import React, { useState } from "react";
import UnderGraduateForm from "../components/applyForm/underGraduate/page";
import PostGraduateForm from "../components/applyForm/postGraduate/page";

export default function ApplyPage() {
    const [activeForm, setActiveForm] = useState<"ug" | "pg">("ug");

    return (
        <div className="bg-blue-50">
            <h2 className="text-2xl font-bold text-center text-white mb-6 p-4 bg-green-700">
                Online Admission
            </h2>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setActiveForm("ug")}
                    className={`px-4 py-2 rounded font-medium border ${activeForm === "ug"
                        ? "bg-green-700 text-white"
                        : "bg-white text-green-700 border-green-700"
                        }`}
                >
                    Undergraduate Admission
                </button>

                <button
                    onClick={() => setActiveForm("pg")}
                    className={`px-4 py-2 rounded font-medium border ${activeForm === "pg"
                        ? "bg-green-700 text-white"
                        : "bg-white text-green-700 border-green-700"
                        }`}
                >
                    Postgraduate Admission
                </button>
            </div>

            <div className="max-w-10/12 mx-auto">
                {activeForm === "ug" && <UnderGraduateForm />}
                {activeForm === "pg" && <PostGraduateForm />}
            </div>
        </div>
    );
}
