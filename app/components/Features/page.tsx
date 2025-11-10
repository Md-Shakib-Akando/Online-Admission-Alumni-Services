"use client";
import React from "react";
import { FaFileAlt, FaCreditCard, FaUsers, FaCheckCircle } from "react-icons/fa";

export default function Features() {


    return (
        <section className="py-16 bg-blue-50 ">
            <div className="max-w-11/12 mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div

                        className=" p-6  inset-shadow-sm border-b-4 border-t-4 border-emerald-500 rounded-xl flex flex-col items-center text-center shadow-lg"
                    >
                        <div className="mb-4"><FaFileAlt size={30} className="text-emerald-500" /></div>
                        <h3 className="text-xl font-semibold mb-2">Online Application</h3>
                        <p className="">Submit your admission form digitally with ease and efficiency.</p>
                    </div>
                    <div

                        className=" p-6 inset-shadow-sm border-b-4 border-t-4 border-pink-500 rounded-xl flex flex-col items-center text-center shadow-lg"
                    >
                        <div className="mb-4"><FaCreditCard size={30} className="text-pink-500" /></div>
                        <h3 className="text-xl font-semibold mb-2">Secure Online Payment</h3>
                        <p className="">Calculate fees automatically and pay securely through multiple gateways.</p>
                    </div>
                    <div

                        className=" p-6 inset-shadow-sm border-b-4 border-t-4  border-indigo-500 rounded-xl flex flex-col items-center text-center shadow-lg"
                    >
                        <div className="mb-4"><FaUsers size={30} className="text-indigo-500" /></div>
                        <h3 className="text-xl font-semibold mb-2">Alumni Services</h3>
                        <p className="">Apply for certificates, complete clearance, and track history online.</p>
                    </div>
                    <div

                        className=" p-6 inset-shadow-sm border-b-4 border-t-4 border-yellow-400 rounded-xl flex flex-col items-center text-center shadow-lg"
                    >
                        <div className="mb-4"><FaCheckCircle size={30} className="text-yellow-500" /></div>
                        <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
                        <p className="">Track your application, clearance, and certificate requests instantly.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
