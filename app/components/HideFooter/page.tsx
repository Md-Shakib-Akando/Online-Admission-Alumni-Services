// components/HideFooter.tsx
"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface HideFooterProps {
    children: ReactNode;
}

export default function HideFooter({ children }: HideFooterProps) {
    const pathname = usePathname();

    if (pathname?.includes("dashboard")) return null;

    return <>{children}</>;
}
