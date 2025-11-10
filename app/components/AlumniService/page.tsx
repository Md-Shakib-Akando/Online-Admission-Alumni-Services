
import React from 'react';
import AlImage from '../../../public/assets/alumni1.jpg'
import Image from 'next/image';

export default function AlumniSection() {
    return (
        <section className="py-20 bg-green-50">
            <div className="max-w-11/12 mx-auto px-6 flex justify-between gap-24">

                <div className="relative md:w-[50%] w-full">
                    <Image
                        src={AlImage}
                        alt="Alumni"
                        className="rounded-lg shadow-lg w-full"
                    />
                    <div className="absolute bottom-4 -right-6 bg-yellow-700 text-white p-4 rounded shadow-lg">
                        <p className="italic text-sm">
                            “Once an alum, always a part of our family.”
                        </p>
                        <span className="block text-xs mt-1 font-bold text-end">— Jane Doe, Alumni</span>
                    </div>
                </div>

                <div className='md:w-[50%] w-full'>
                    <h3 className="text-4xl font-bold mb-6 text-slate-900">
                        Alumni Services & Opportunities
                    </h3>
                    <p className="mb-6 text-slate-600 leading-relaxed">
                        At Pundra University, we are committed to supporting our alumni throughout their post-graduation journey.
                        From certificate requests and clearance procedures to networking events, career guidance, and regular updates,
                        our alumni services provide a seamless way to stay connected, access essential resources, and engage with the university community.
                        Discover opportunities to grow professionally and maintain lifelong ties with your alma mater.
                    </p>


                    <ul className="space-y-3 text-slate-700 text-lg">
                        <li><span className="font-bold text-slate-500">01.</span> Certificate Request</li>
                        <li><span className="font-bold text-slate-500">02.</span> Clearance Process</li>
                        <li><span className="font-bold text-slate-500">03.</span> Alumni Events & Networking</li>
                        <li><span className="font-bold text-slate-500">04.</span> Career Guidance</li>
                        <li><span className="font-bold text-slate-500">05.</span> Newsletter & Updates</li>
                    </ul>
                    <a href="/alumni" className="inline-block mt-6 text-blue-600 font-semibold hover:underline">
                        Go to Alumni Services →
                    </a>
                </div>
            </div>
        </section>

    );
}
