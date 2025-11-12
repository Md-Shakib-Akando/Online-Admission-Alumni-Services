"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard/sideBar/page";
import DashboardNav from "../components/Dashboard/dashboardNav/pag";



import { useAuth } from "../components/Auth/AuthProvider/page";
import DashboardHome from "../components/Dashboard/DashboardHome/page";
import VerifyApplicant from "../components/Dashboard/admin/verifyApplicant/page";
import ApplicantHome from "../components/Dashboard/applicant/applicantHome/page";
import CertificateRequests from "../components/Dashboard/admin/AlumniRequest/page";
import Applications from "../components/Dashboard/applicant/application/page";
import AlumniHome from "../components/Dashboard/alumni/alumniHome/page";
import AlumniApplication from "../components/Dashboard/alumni/alumniApplication/page";
import PaymentHistory from "../components/Dashboard/alumni/paymentHistory/page";
import ALLPaymentHistory from "../components/Dashboard/admin/paymentsHistory/page";

type User = {
    id: number;
    name: string;
    email: string;
    role: "admin" | "alumni" | "applicant";
    student_id?: string | null;
    photo_url?: string | null;
};



export default function DashboardWrapper() {
    const { user, loading } = useAuth();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [isFetching, setIsFetching] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<string>("dashboard"); // page to render

    // Fetch current logged-in user details
    useEffect(() => {
        if (!user?.email) {
            setIsFetching(false);
            return;
        }

        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users");
                const data: { success: boolean; users: User[] } = await res.json();

                if (data.success && data.users.length > 0) {
                    const foundUser = data.users.find(u => u.email === user.email);
                    if (foundUser) setCurrentUser(foundUser);
                }
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setIsFetching(false);
            }
        };

        fetchUsers();
    }, [user?.email]);

    if (loading || isFetching) {
        return (
            <div className="flex items-center justify-center h-screen bg-blue-700 text-white">
                Loading user data...
            </div>
        );
    }

    const renderPage = () => {
        if (!currentUser) return <p>No user data</p>;

        switch (currentUser.role) {
            case "admin":
                switch (currentPage) {
                    case "dashboard":
                        return <DashboardHome></DashboardHome>;
                    case "manageApplication":
                        return <VerifyApplicant></VerifyApplicant>;
                    case "alumniRequest":
                        return <CertificateRequests></CertificateRequests>;
                    case "payments":
                        return <ALLPaymentHistory></ALLPaymentHistory>;

                    default:
                        return <DashboardHome></DashboardHome>;
                }
            case "applicant":
                switch (currentPage) {
                    case "applicant-Home":
                        return <ApplicantHome></ApplicantHome>;
                    case "my-application":
                        return <Applications></Applications>;
                    case "payments":
                        return <PaymentHistory></PaymentHistory>;
                    default:
                        return <ApplicantHome></ApplicantHome>;
                }
            case "alumni":
                switch (currentPage) {
                    case "alumni-Home":
                        return <AlumniHome></AlumniHome>;
                    case "my-application":
                        return <AlumniApplication></AlumniApplication>;
                    case "payments":
                        return <PaymentHistory></PaymentHistory>;
                    default:
                        return <AlumniHome></AlumniHome>;
                }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 pt-5">

            <div className="flex-1 lg:w-[30%]">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}   // ← add this
                    currentUser={currentUser}
                />


            </div>

            <div className="w-full lg:w-[75%] xl:w-[82%] 2xl:w-[86%] flex flex-col">

                <DashboardNav setSidebarOpen={setSidebarOpen} />
                <main className=" p-4">{renderPage()}</main>
            </div>
        </div>

    );
}
