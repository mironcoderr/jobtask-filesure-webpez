import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
    },
});

apiServer.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiServer.interceptors.response.use(
    async (response) => response, 
    async (error) => {
        
        if (error.response?.status === 401) {
            const cookieStore = await cookies();
            cookieStore.delete("token");
            redirect('/login');
        }

        if (error.response?.status === 403) {
            throw new Error("FORBIDDEN");
        }

        return Promise.reject(error.response?.data || error);
    }
);

export default apiServer;
