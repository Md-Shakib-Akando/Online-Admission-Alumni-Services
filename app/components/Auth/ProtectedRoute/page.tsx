"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider/page";


export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            const currentPath = window.location.pathname;
            router.push(`/login?from=${encodeURIComponent(currentPath)}`);
        }
    }, [user, loading, router]);



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold text-gray-600">Loading...</p>
            </div>
        );
    }


    return <>{user ? children : null}</>;
}