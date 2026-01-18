import toast from "react-hot-toast";
import apiClient from "@/library/axios.client";
import { useRouter, usePathname } from "next/navigation";
import { Purchase } from "@/types/purchase";

export default function usePurchase() {

    const router = useRouter();
    const pathname = usePathname();

    const purchase = async () => {
        try {
            const { data } = await apiClient.post<Purchase>("/purchases");
            router.push(`${pathname}?credit=success`);
            return {success: false, data};
        } 
        catch {
            toast.error("Network error, please try again!");
            return {success: false, data: null};
        }
    }

    return {
        purchase
    }
}