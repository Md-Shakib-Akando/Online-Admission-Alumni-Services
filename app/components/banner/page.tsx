"use client";
import React from "react";
import Image from "next/image";
import bannerImg from "../../../public/assets/pub.jpg";
import Link from "next/link";

export default function Banner() {
    return (
        <section className="relative w-full  h-[80vh] flex items-center justify-center">

            <Image
                src={bannerImg}
                alt="Banner"
                fill
                className="object-cover object-center"
                priority
            />


            <div className="absolute inset-0 bg-black/75"></div>


            <div className="absolute text-center  text-white px-4 md:px-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4"> Online Admission & Alumni Services</h1>
                <p className="text-lg md:text-2xl my-10  md:w-[70%] md:mx-auto"> Submit your applications, track your admission, or request alumni certificates easily.</p>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/admission/form"
                        className="bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition"
                    >
                        Apply Now
                    </Link>
                    <Link
                        href="/about"
                        className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-blue-900 transition"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
