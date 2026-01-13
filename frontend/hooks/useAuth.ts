"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import apiClient from "@/library/axios.client";

export const useAuth = () => {

    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await apiClient.post("/auth/logout");

            if (!response.data.success) {
                toast.error(response.data.message || "Logout failed");
                return;
            }

            toast.success("Logged out successfully!");

            router.replace("/");
            
            router.refresh();

        } 
        catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return { 
        handleLogout 
    };
};
