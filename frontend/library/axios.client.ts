"use client";

import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('token');

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

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




