"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { registerSchema, RegisterType } from "@/schemas/RegisterSchema";
import PasswordFieldComponent from "@/components/PasswordFieldComponent";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";


export default function RegistrationFormComponent() {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<RegisterType>({
        name: "", 
        email: "",
        password: "",
        repeatPassword: "",
        referralCode: ""
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("refercode") ?? "";
            setFormData(prev => ({ ...prev, referralCode: code }));
        }
    }, []);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistrationForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsedData = registerSchema.safeParse(formData);

        if (!parsedData.success) {
            const fieldErrors = parsedData.error.flatten().fieldErrors;

            setError({
                name: fieldErrors.name?.[0] || "",
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
                repeatPassword: fieldErrors.repeatPassword?.[0] || "",
            });

            return;
        }

        setError({ 
            name: "", 
            email: "", 
            password: "", 
            repeatPassword: "" 
        });

        setLoading(true);

        try {
            const { repeatPassword, ...payload } = parsedData.data;

            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/register", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            setLoading(false);
            
            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Registration failed!");
                return;
            }
            else {
                toast.success(result.message || "Registration successfully done!");
                router.push('/login');
            }
        } 
        catch(error) {
            setLoading(false);
            toast.error("Something went wrong network issue!");
        }
    };

    return (
        <form onSubmit={handleRegistrationForm} className="relative w-full max-w-sm mx-auto rounded-3xl p-6 mb-8 bg-white">
            <h3 className="text-xl font-bold text-center mb-6">Create a New Account</h3>

            <div className="mb-4">
                <label className="block text-xs font-medium capitalize mb-1 field-required">Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeInput}
                    placeholder="Enter your full name"
                    className={`
                        w-full h-11 px-4 font-medium rounded-xl border text-heading focus:bg-white focus:border-primary/50 transition
                        ${error.name ? "border-danger/50 bg-white" : "border-gray-100 bg-gray-100"}
                    `}
                />
                {error.name && 
                    <small className="mt-1 block text-xs font-medium text-danger">{error.name}</small>
                }
            </div>
            
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
                <PasswordFieldComponent name="password" hasError={error.password} value={formData.password} onChange={handleChangeInput} placeholder="Create a new password" />
                {error.password && <small className="mt-1 block text-xs font-medium text-red-500">{error.password}</small>}
            </div>

            <div className="mb-4">
                <label className="block text-xs font-medium capitalize mb-1 field-required">Repeat Password</label>
                <PasswordFieldComponent name="repeatPassword" hasError={error.repeatPassword} value={formData.repeatPassword} onChange={handleChangeInput} placeholder="Repeat existing password" />
                {error.repeatPassword && <small className="mt-1 block text-xs font-medium text-red-500">{error.repeatPassword}</small>}
            </div>

            {formData.referralCode &&
                <div className="mb-4">
                    <label className="block text-xs font-medium capitalize mb-1">referral code</label>
                    <input type="text" name="referralCode" defaultValue={formData.referralCode} readOnly={true} className="w-full h-11 px-4 font-medium rounded-xl cursor-not-allowed border border-primary/50 text-heading bg-gray-100 transition"/>
                </div>
            }

            <button 
                type="submit" 
                className={(loading ? 'opacity-50' : 'opacity-100') + ' w-full h-11 mt-2 mb-4 font-semibold rounded-full capitalize bg-primary text-white'}>
                {loading ? 'processing...' : 'registration'}
            </button>

            <p className="text-sm font-medium text-center">
                Already have an account? <Link href="/login" className="inline font-semibold capitalize text-primary">login</Link>
            </p>
        </form>
    )
}