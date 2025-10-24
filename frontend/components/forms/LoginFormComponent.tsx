"use client"

import PasswordFieldComponent from "@/components/PasswordFieldComponent";
import { LoginType, loginSchema } from "@/schemas/LoginSchema";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/stores/settings/hooks";
import { UserRoleEnum } from "@/enums/userRoleEnum";
import { fetchMyData, setMyData } from "@/stores/slices/user";
import { useRouter } from "next/navigation";
import credentials from "@/json/credentials.json";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginFormComponent() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<LoginType>({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const handleLoginCredential = (role: string) => {
        const credential = credentials[role as keyof typeof credentials];
        if (credential) {
            setFormData(prev => ({
                ...prev,
                ...credential,
            }));
        }
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLoginForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsedData = loginSchema.safeParse(formData);

        if (!parsedData.success) {
            const fieldErrors = parsedData.error.flatten().fieldErrors;

            setError({
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
            });

            return;
        }

        setError({ 
            email: "", 
            password: "", 
        });

        setLoading(true);

        try {
            const payload = parsedData.data;

            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            setLoading(false);
            
            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Login failed!");
                return;
            }
            else {
                toast.success(result.message || "Login successfully done!");

                dispatch(fetchMyData());
                dispatch(setMyData(result.user));

                if(result.user.role === UserRoleEnum.ADMIN) {
                    router.push("/dashboard");
                }
                else {
                    router.push('/');
                }
            }
        } 
        catch(error) {
            setLoading(false);
            toast.error("Something went wrong network issue!");
        }
    };

    return (
        <form onSubmit={handleLoginForm} className="relative w-full max-w-sm mx-auto rounded-3xl p-6 mb-8 bg-white">
            <h3 className="text-xl font-bold text-center mb-6">
                Login to your account
            </h3>
            
            <div className="mb-4">
                <label className="block text-xs font-medium capitalize mb-1 field-required">Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeInput}
                    placeholder="Enter your email address"
                    className={`
                        w-full h-11 px-4 font-medium rounded-xl border text-heading focus:bg-white focus:border-primary/50 transition 
                        ${error.email ? "border-danger/50 bg-white" : "border-gray-100 bg-gray-100"} 
                    `}
                />
                {error.email && 
                    <small className="mt-1 block text-xs font-medium text-red-500">{error.email}</small>
                }
            </div>

            <div className="mb-4">
                <label className="block text-xs font-medium capitalize mb-1 field-required">Create Password</label>
                <PasswordFieldComponent name="password" hasError={error.password} value={formData.password} onChange={handleChangeInput} placeholder="Enter your password" />
                {error.password && <small className="mt-1 block text-xs font-medium text-red-500">{error.password}</small>}
            </div>

            <button 
                type="submit" 
                className={(loading ? 'opacity-50' : 'opacity-100') + ' w-full h-11 mt-2 mb-4 font-semibold rounded-full capitalize bg-primary text-white'}>
                {loading ? 'processing...' : 'login'}
            </button>

            <p className="text-sm font-medium text-center">
                Don't have an account? <Link href="/registration" className="inline font-semibold capitalize text-primary">registration</Link>
            </p>

            <div className="py-4 before:w-full before:h-[1px] before:bg-primary/10">
                <span className="mx-auto -mt-6.5 relative z-10 w-10 aspect-square rounded-full flex items-center justify-center font-medium border border-primary/10 bg-white">or</span>
            </div>

            <button 
                type="button"
                onClick={()=> handleLoginCredential('client')}
                className="w-full h-11 mb-4 font-medium rounded-full capitalize bg-blue-500 text-white">
                client credentials
            </button>
            <button 
                type="button" 
                onClick={()=> handleLoginCredential('admin')}
                className="w-full h-11 mb-4 font-medium rounded-full capitalize bg-rose-500 text-white">
                admin credentials
            </button>
        </form>
    )
}