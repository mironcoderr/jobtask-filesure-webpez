"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import apiClient from "@/library/axios.client";
import toast from "react-hot-toast";
import { User } from "@/types/user";

export default function ClientPurchaseButtonComponent({user}: {user: User | null}) {

    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);

    const handlePurchaseProduct = async () => {
        if(!user) {
            toast.error("Please login before purchase!");
            router.replace("/login");
            return;
        }

        if(!user.referredBy) {
            toast.error("No credits without reffered user.");
            return
        }

        if(user.isFirstPurchaseFromReferral) {
            toast.error("Already used your referral credit.");
            return;
        }

        setLoading(true);

        try {
            await apiClient.post("/purchases");
            router.push(`${pathname}?credit=success`);
        } 
        catch (error) {
            toast.error("Network error, please try again!");
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handlePurchaseProduct}
            disabled={loading}
            className={`px-4 h-10 rounded-full shadow-xl flex items-center justify-center gap-1.5 bg-primary text-white ${
                loading ? "opacity-80 cursor-not-allowed" : "opacity-100"
            }`}
        >
            <i className="mc-line-cart text-lg shrink-0"></i>
            <span className="text-sm font-medium capitalize whitespace-nowrap">
                {loading ? "processing..." : "purchase now"}
            </span>
        </button>
    );
}
