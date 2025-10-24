"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function ClientPurchaseButtonComponent() {

    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);

    const handlePurchaseProduct = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/purchases`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    toast.error("You must be logged in before purchase!");
                    router.replace("/login");
                } 
                else {
                    toast.error(data.message || "Purchase failed!");
                }
                setLoading(false);
                return;
            }

            if(data.credited) {
                toast.success(data.message || "Purchase successful!");
                router.push(`${pathname}?credit=success`);
            }
            else {
                toast(data.message, {
                    icon: '😞',
                })
            }
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
            <i className="mc-line-cart text-lg flex-shrink-0"></i>
            <span className="text-sm font-medium capitalize whitespace-nowrap">
                {loading ? "processing..." : "purchase now"}
            </span>
        </button>
    );
}
