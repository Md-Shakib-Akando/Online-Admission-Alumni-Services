"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../components/Auth/AuthProvider/page";


type User = {
    id: number;
    name: string;
    email: string;
    role: "applicant" | "alumni";
    student_id?: string | null;
    photo_url?: string | null;
};

type Service = {
    id: number;
    title: string;
    description: string;

};

export default function AlumniServicePage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [showWarning, setShowWarning] = useState(false);

    const services: Service[] = [
        {
            id: 1,
            title: "Certificate Request",
            description:
                "Find out how you can order copies of degree certificates and graduate transcripts.",

        },
        {
            id: 2,
            title: "Career Support",
            description:
                "Explore the services available to you as a graduate from our Careers and Employability teams.",

        },
        {
            id: 3,
            title: "Accommodation",
            description:
                "Find out how alumni can stay in campus accommodation at a discounted rate.",

        },
        {
            id: 4,
            title: "Sports Membership",
            description:
                "Access fantastic sports facilities with an alumni sports membership for a small fee.",

        },
        {
            id: 5,
            title: "Library Access",
            description:
                "Get library membership with access to our eight libraries and digital resources.",

        },
        {
            id: 6,
            title: "Health & Wellness",
            description:
                "Stay connected with health and wellness programs designed for alumni.",

        },
    ];

    useEffect(() => {
        if (!user?.email) return;
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users");
                if (!res.ok) throw new Error("Failed to fetch users");

                const data = await res.json();
                if (data.success && data.users.length > 0) {
                    const foundUser = data.users.find(
                        (u: User) => u.email === user.email
                    );
                    if (foundUser) setCurrentUser(foundUser);
                    else console.error("Logged-in user not found in DB");
                } else {
                    console.error("No users found in DB");
                }
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, [user?.email]);

    const handleServiceClick = (service: Service) => {
        if (!currentUser) return;

        if (service.id === 1) {
            if (currentUser.role === "alumni") {
                router.push("/alumni/certificate-apply");
            } else {
                setShowWarning(true);
            }
        } else {
            alert(`You clicked on ${service.title}`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Please login to access Alumni Services.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-sky-600 text-center">
                Alumni Services
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden"
                        onClick={() => handleServiceClick(service)}
                    >


                        <div className="p-5 flex flex-col justify-between h-44">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500">{service.description}</p>
                            </div>
                            <button className="text-white bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-md w-fit mt-4">
                                Find out more
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showWarning && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md p-6 max-w-sm mx-auto shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-red-600">
                            Access Denied
                        </h2>
                        <p className="mb-6 text-gray-700">
                            Only alumni users can request certificates. Please contact admin
                            if you believe this is an error.
                        </p>
                        <button
                            onClick={() => setShowWarning(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
