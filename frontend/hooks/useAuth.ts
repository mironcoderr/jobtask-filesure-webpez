import Cookies from "js-cookie";
import toast from "react-hot-toast";
import apiClient from "@/library/axios.client";
import { useAppDispatch } from "@/stores/settings/hooks";
import { setAuthentication } from "@/stores/slices/auth";
import { RegisterType } from "@/schemas/RegisterSchema";
import { UserRoleEnum } from "@/enums/userRoleEnum";
import { LoginType } from "@/schemas/LoginSchema";
import { useRouter } from "next/navigation";
import { Register } from "@/types/register";
import { Login } from "@/types/login";


export default function useAuth() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const register = async (payload: Omit<RegisterType, 'repeatPassword'>) => {
        try {
            const { data } = await apiClient.post<Register>("/auth/register", payload);

            if (!data.success) {
                toast.error(data.message);
                return {success: false, data: null};
            }

            toast.success(data.message);

            router.push('/login');

            return {success: false, data};
        }
        catch {
            toast.error("Something went wrong network issue!");
            return {success: false, data: null};
        }
    }

    const login = async (payload: LoginType) => {
        try {
            const { data } = await apiClient.post<Login>("/auth/login", payload);

            if (!data.success) {
                toast.error(data.message);
                return {success: false, data: null};
            }

            Cookies.set("token", data.token);

            dispatch(setAuthentication(true));

            toast.success(data.message);

            const searchParams = new URLSearchParams(window.location.search);
            const redirectTo = searchParams.get("redirect");

            if (redirectTo) router.push(redirectTo.startsWith("/") ? redirectTo : `/${redirectTo}`);
            else if (data.user.role === UserRoleEnum.ADMIN) router.push("/dashboard");
            else router.push("/");

            return {success: false, data};
        }
        catch {
            toast.error("Something went wrong network issue!");
            return {success: false, data: null};
        }
    }

    const logout = () => {
        Cookies.remove('token');
        dispatch(setAuthentication(false));
        toast.success('Logged out successfully!');
        router.replace("/");
    };

    return { 
        login,
        logout,
        register
    };
};
