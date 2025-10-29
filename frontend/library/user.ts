import { User } from "@/types/user";
import { getToken } from "./token";
import { Referral } from "@/types/referral";

export async function getMyData(): Promise<User | null> {

    const token = await getToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
            method: "GET",
            credentials: "include",
            cache: "no-store"
        });

        if (!res.ok) return null;

        const data = await res.json();
        
        return data.user as User
    } 
    catch (error) {
        return null;
    }
}

export async function getRegisteredUsers(): Promise<User[]> {

    const token = await getToken();
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/registered`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) return [];

        const data = await res.json();

        return data.users as User[];
    } 
    catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function getReferredUsers(): Promise<Referral[]> {

    const token = await getToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/referred`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
        });

        if (!res.ok) return [];

        const data = await res.json();

        return data.referrals as Referral[];
    } 
    catch (error) {
        console.error("Error fetching referrals:", error);
        return [];
    }
}
