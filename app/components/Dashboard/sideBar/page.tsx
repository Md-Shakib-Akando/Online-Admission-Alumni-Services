import React from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: "admin" | "alumni" | "applicant";
    student_id?: string | null;
    photo_url?: string | null;
};

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
    currentPage: string;
    currentUser: User | null;
}

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    setCurrentPage,
    currentPage,
    currentUser,
}: SidebarProps) {
    if (!currentUser) return null;


    const buttonClasses = (page: string) =>
        `flex items-center gap-2 py-2 px-4 rounded-lg w-full text-center transition-colors duration-200 font-bold
        ${currentPage === page
            ? "bg-cyan-500 text-white font-bold shadow-lg"
            : "text-gray-200 hover:bg-gray-800 hover:text-white"
        }`;

    return (
        <>

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/30 z-20 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white z-30 transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div>
                        <h2 className="text-xl font-bold capitalize">{currentUser.role}</h2>
                        <p className="text-sm text-gray-400 truncate">{currentUser.name}</p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-white text-xl lg:hidden"
                    >
                        ✕
                    </button>
                </div>

                {/* Navigation */}
                <nav className="pt-6 px-4 space-y-2">
                    {currentUser.role === "admin" && (
                        <>
                            <button
                                onClick={() => setCurrentPage("dashboard")}
                                className={buttonClasses("dashboard")}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => setCurrentPage("manageApplication")}
                                className={buttonClasses("manageApplication")}
                            >
                                Manage Applications
                            </button>
                            <button
                                onClick={() => setCurrentPage("alumniRequest")}
                                className={buttonClasses("alumniRequest")}
                            >
                                Alumni Request
                            </button>
                            <button
                                onClick={() => setCurrentPage("payments")}
                                className={buttonClasses("payments")}
                            >
                                All Payment History
                            </button>
                        </>
                    )}

                    {currentUser.role === "alumni" && (
                        <>
                            <button
                                onClick={() => setCurrentPage("alumni-Home")}
                                className={buttonClasses("alumni-Home")}
                            >
                                Alumni Home
                            </button>
                            <button
                                onClick={() => setCurrentPage("my-application")}
                                className={buttonClasses("my-application")}
                            >
                                My Application
                            </button>
                            <button
                                onClick={() => setCurrentPage("payments")}
                                className={buttonClasses("payments")}
                            >
                                Payment History
                            </button>
                        </>
                    )}

                    {currentUser.role === "applicant" && (
                        <>

                            <button
                                onClick={() => setCurrentPage("applicant-Home")}
                                className={buttonClasses("applicant-Home")}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setCurrentPage("my-application")}
                                className={buttonClasses("my-application")}
                            >
                                My Application
                            </button>
                            <button
                                onClick={() => setCurrentPage("payments")}
                                className={buttonClasses("payments")}
                            >
                                Payment History
                            </button>
                        </>

                    )}
                </nav>
            </aside>
        </>
    );
}
