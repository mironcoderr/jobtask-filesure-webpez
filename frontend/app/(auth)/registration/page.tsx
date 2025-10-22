"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { registerSchema } from "@/schemas/RegisterSchema";
import PasswordFieldComponent from "@/components/PasswordFieldComponent";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {

    const [formData, setFormData] = useState({
        fullName: "", 
        emailAddress: "",
        createPassword: "",
        repeatPassword: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        emailAddress: "",
        createPassword: "",
        repeatPassword: "",
    });

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistrationForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const parsed = registerSchema.safeParse(formData);

        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;

            setErrors({
                fullName: fieldErrors.fullName?.[0] || "",
                emailAddress: fieldErrors.emailAddress?.[0] || "",
                createPassword: fieldErrors.createPassword?.[0] || "",
                repeatPassword: fieldErrors.repeatPassword?.[0] || "",
            });

            return;
        }

        setErrors({ 
            fullName: "", 
            emailAddress: "", 
            createPassword: "", 
            repeatPassword: "" 
        });

        toast.loading("Registering...");

        try {
            const response = await fetch("/api/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });

            toast.dismiss();
            
            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Registration failed!");
                return;
            }

            toast.success("Registration successfully!");

        } 
        catch {
            toast.dismiss();
            toast.error("Something went wrong!");
        }
    };

    return (
        <main className="bg-[url(/images/patterns/turing.jpg)] bg-no-repeat bg-cover">
            <div className="w-dvw h-dvh py-10 px-3 thin-scrolling overflow-y-auto bg-gradient-to-t from-primary/95 to-black/95">
                <Link href="/" className="flex items-center gap-0.5 w-fit mx-auto mb-8 text-white">
                    <i className="mc-fill-file text-3xl"></i>
                    <span className="text-3xl font-bold">webpez</span>
                </Link>

                <form onSubmit={handleRegistrationForm} className="relative w-full max-w-sm mx-auto rounded-3xl p-6 mb-8 bg-white">
                    <h3 className="text-xl font-bold text-center mb-6">Create a New Account</h3>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium capitalize mb-1 field-required">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChangeInput}
                            placeholder="Enter your full name"
                            className={`w-full h-11 px-4 font-medium rounded-xl border ${errors.fullName ? "border-red-500" : "border-gray-100"
                                } bg-gray-100 focus:bg-white focus:border-primary/50 transition`}
                        />
                        {errors.fullName && <small className="mt-1 block text-xs font-medium text-red-500">{errors.fullName}</small>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium capitalize mb-1 field-required">Email Address</label>
                        <input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChangeInput}
                            placeholder="Enter your email address"
                            className={`w-full h-11 px-4 font-medium rounded-xl border ${errors.emailAddress ? "border-red-500" : "border-gray-100"
                                } bg-gray-100 focus:bg-white focus:border-primary/50 transition`}
                        />
                        {errors.emailAddress && <small className="mt-1 block text-xs font-medium text-red-500">{errors.emailAddress}</small>}
                    </div>

                    {/* Create Password */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium capitalize mb-1 field-required">Create Password</label>
                        <PasswordFieldComponent name="createPassword" value={formData.createPassword} onChange={handleChangeInput} placeholder="Create a new password" />
                        {errors.createPassword && <small className="mt-1 block text-xs font-medium text-red-500">{errors.createPassword}</small>}
                    </div>

                    {/* Repeat Password */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium capitalize mb-1 field-required">Repeat Password</label>
                        <PasswordFieldComponent name="repeatPassword" value={formData.repeatPassword} onChange={handleChangeInput} placeholder="Repeat existing password" />
                        {errors.repeatPassword && <small className="mt-1 block text-xs font-medium text-red-500">{errors.repeatPassword}</small>}
                    </div>

                    <button type="submit" className="w-full h-11 mb-4 font-semibold rounded-full capitalize bg-primary text-white transition">
                        Registration
                    </button>
                </form>
            </div>
        </main>
    );
}
