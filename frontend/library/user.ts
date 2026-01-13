import { User } from "@/types/user";
import { Referral } from "@/types/referral";
import apiServer from "./axios.server";

export async function getMyData(): Promise<User | null> {
    try {
        const res = await apiServer.get("/users/me");
        if (!res.data.success) return null;

        return res.data.user as User
    } 
    catch (error) {
        return null;
    }
}

export async function getRegisteredUsers(): Promise<User[]> {    
    try {
        const res = await apiServer.get("/users/registered");

        if (!res.data.success) return [];

        return res.data.users as User[];
    } 
    catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function getReferredUsers(): Promise<Referral[]> {
    try {
        const res = await apiServer.get("/users/referred");

        if (!res.data.success) return [];

        return res.data.referrals as Referral[];
    } 
    catch (error) {     
        console.error("Error fetching referred users:", error);
        return [];
    }   
}
