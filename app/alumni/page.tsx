"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFileAlt, FaMoneyCheckAlt } from "react-icons/fa";

type Service = {
    id: number;
    title: string;
    description: string;
    icon: React.ReactElement;
};

export default function AlumniServicePage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [clearanceStatus, setClearanceStatus] = useState<boolean | null>(null);

    const services: Service[] = [
        {
            id: 1,
            title: "Certificate Request",
            description: "Apply for your alumni certificate",
            icon: <FaFileAlt size={36} className="text-sky-500 mx-auto mb-4" />,
        },
        {
            id: 2,
            title: "Clearance / Payment",
            description: "Check your clearance status and make pending payments",
            icon: <FaMoneyCheckAlt size={36} className="text-green-500 mx-auto mb-4" />,
        },
    ];

    // Simulated clearance fetch function (replace with real API)
    const fetchClearanceStatus = async (): Promise<boolean> => {
        // simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        return true; // change to false to simulate pending clearance
    };

    const handleServiceClick = async (service: Service) => {
        setSelectedService(service);

        if (service.title === "Certificate Request") {
            // fetch clearance status first
            const status = await fetchClearanceStatus();
            setClearanceStatus(status);
            setIsModalOpen(true);
        } else {
            router.push("/alumni/payment");
        }
    };

    const handleModalYes = () => {
        setIsModalOpen(false);
        if (clearanceStatus) {
            router.push("/alumni/certificate-apply"); // go to your apply page
        } else {
            router.push("/alumni/payment"); // go to payment page
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-sky-600">Alumni Services</h1>

            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mb-8 rounded-md">
                <p className="text-gray-700">
                    Welcome to the alumni services portal. Before applying for a certificate,
                    please ensure all clearance payments are completed. Click on a service below
                    to proceed.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="p-6 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition duration-300"
                        onClick={() => handleServiceClick(service)}
                    >
                        <div className="text-center">
                            {service.icon}
                            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                            <p className="text-gray-500">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedService && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-semibold mb-4">Certificate Request</h2>
                        <p className="mb-6">
                            {clearanceStatus
                                ? "✅ Your clearance is complete. Click YES to proceed to the application form."
                                : "⚠️ Clearance is pending. Click YES to go to the payment page first."}
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={() => setIsModalOpen(false)}
                            >
                                NO
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600"
                                onClick={handleModalYes}
                            >
                                YES
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
