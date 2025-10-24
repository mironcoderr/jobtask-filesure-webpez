import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import AdminLogoutComponent from "@/components/buttons/AdminLogoutButtonComponent";

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function ClientLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="px-4 pb-4">
            <header className="py-5 flex items-center justify-between gap-2">
                <Link href="/" className="flex items-center gap-0.5 text-primary">
                    <i className="mc-fill-file text-3xl"></i>
                    <span className="text-3xl font-bold">webpez</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link href="/" className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-primary text-primary">
                        <i className="mc-fill-back-square text-lg"></i>
                        <span className="text-sm font-semibold">Back to Home</span>
                    </Link>
                    <AdminLogoutComponent />
                </nav>
            </header>

            {children}

        </main>
    )
}