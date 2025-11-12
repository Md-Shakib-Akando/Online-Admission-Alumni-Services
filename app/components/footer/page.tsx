"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#020617] text-white py-12">
            <div className=" max-w-11/12 mx-auto px-6 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Pundra University</h2>
                    <p className="text-gray-200 text-sm sm:text-base">
                        Empowering students with quality education and seamless admission & alumni services.
                    </p>
                    <div className="flex space-x-3 mt-4">
                        <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
                        <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
                        <a href="#" className="hover:text-gray-300"><FaLinkedinIn /></a>
                        <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-200 text-sm sm:text-base">
                        <li><a href="/admission" className="hover:text-gray-300">Online Admission</a></li>
                        <li><a href="/alumni" className="hover:text-gray-300">Alumni Services</a></li>
                        <li><a href="/programs" className="hover:text-gray-300">Programs</a></li>
                        <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                    <ul className="space-y-2 text-gray-200 text-sm sm:text-base">
                        <li>Email: info@pundrauniversity.edu.bd</li>
                        <li>Phone: +880 1234 567 890</li>
                        <li>Address: 123 University Rd, Pundra City, Bangladesh</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                    <p className="text-gray-200 mb-4 text-sm sm:text-base">
                        Subscribe to stay updated on admissions and alumni events.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black flex-1"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

            </div>

            <div className="mt-10 border-t border-[#060c27] pt-6 text-center text-gray-300 text-sm">
                &copy; {new Date().getFullYear()} Pundra University. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
