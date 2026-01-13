"use client";

import axios from "axios";
import toast from "react-hot-toast";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
    withCredentials: true,
});

apiClient.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 403) {
            toast.error("You don't have permission!");
        }
        throw err;
    }
);

export default apiClient;




