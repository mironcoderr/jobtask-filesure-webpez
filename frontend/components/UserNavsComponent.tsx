"use client"

import Link from "next/link"
import useAuth from "@/hooks/useAuth";
import { useAppSelector } from "@/stores/settings/hooks";

export default function UserNavsComponent() {
    
    const { logout } = useAuth();
    const { isAuthenticated } = useAppSelector(state => state.auth);

    return (
        isAuthenticated ?
        <nav className="flex items-center gap-3 sm:gap-4">
            <Link href="/dashboard" className="shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-white text-white">
                <i className="mc-fill-grid text-lg"></i>
                <span className="text-sm font-semibold capitalize">dashboard</span>
            </Link>
            <button onClick={logout} type="button" className="shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-primary bg-white">
                <i className="mc-fill-lock text-lg"></i>
                <span className="text-sm font-semibold capitalize">logout</span>
            </button>
        </nav>
        :
        <nav className="flex items-center gap-3 sm:gap-4">
            <Link href="/registration" className="shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-white text-white">
                <i className="mc-fill-pos text-lg"></i>
                <span className="text-sm font-semibold capitalize">registration</span>
            </Link>
            <Link href="/login" className="shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-primary bg-white">
                <i className="mc-fill-circle-user text-lg"></i>
                <span className="text-sm font-semibold capitalize">log in</span>
            </Link>
        </nav>
    )
}