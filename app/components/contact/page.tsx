"use client";
import React from "react";



import ContactMap from "../MapVisualization/page";



const ContactSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-11/12 mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">

                <ContactMap></ContactMap>


                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-6 text-slate-900">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions? Reach out to us and we’ll get back to you as soon as
                        possible.
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                placeholder="Write your message..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
