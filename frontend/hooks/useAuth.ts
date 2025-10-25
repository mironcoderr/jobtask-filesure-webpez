"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setMyData } from "@/stores/slices/user";
import { useAppDispatch } from "@/stores/settings/hooks";

export const useAuth = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/logout", {
                method: "POST",
                credentials: "include",
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Logout failed");
                return;
            }

            dispatch(setMyData(null)); 

            toast.success("Logged out successfully!");

            router.replace("/");

        } 
        catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return { 
        handleLogout 
    };
};
