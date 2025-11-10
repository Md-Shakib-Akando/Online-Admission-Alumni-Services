"use client";
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaUserFriends, FaUserGraduate, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';

const UniversityStats = () => {
    const { ref, inView } = useInView({

        threshold: 0.3,
    });

    const [startCount, setStartCount] = useState(false);

    useEffect(() => {
        setStartCount(inView);
    }, [inView]);


    const stats = [
        { icon: <FaUserFriends size={50} className="text-blue-500" />, label: 'Enrolled Students', count: 3500 },
        { icon: <FaUserGraduate size={50} className="text-green-500" />, label: 'Graduated Students', count: 1200 },
        { icon: <FaBookOpen size={50} className="text-yellow-500" />, label: 'Ongoing Programs', count: 25 },
        { icon: <FaChalkboardTeacher size={50} className="text-red-500" />, label: 'Faculty Members', count: 180 },
    ];

    return (
        <div className='py-20 bg-blue-50'>
            <div className="max-w-11/12 mx-auto ">
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold'>Our University at a Glance</h1>

                </div>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-0' ref={ref}>
                    {stats.map((item, idx) => (
                        <div key={idx} className=' border border-gray-200 rounded-2xl shadow-md flex flex-col items-center p-8'>
                            {item.icon}
                            <h2 className='text-4xl font-bold mt-4 mb-2 text-center'>
                                {startCount && <CountUp start={0} end={item.count} duration={2} />}+
                            </h2>
                            <p className='text-gray-600 text-center'>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UniversityStats;
