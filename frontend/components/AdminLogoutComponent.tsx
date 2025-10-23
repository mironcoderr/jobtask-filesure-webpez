"use client"

import { useAuth } from "@/hooks/useAuth"

export default function AdminLogoutComponent() {

    const { handleLogout } = useAuth();

    return (
        <button onClick={handleLogout} type="button" className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-white bg-primary">
            <i className="mc-fill-logout text-lg"></i>
            <span className="text-sm font-semibold capitalize">logout</span>
        </button>
    )
}