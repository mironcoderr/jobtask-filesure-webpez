"use client"

import { useState } from "react";

interface PasswordFieldProps {
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export default function PasswordFieldComponent({ name, value, onChange, placeholder, className }: PasswordFieldProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`${className} group w-full h-11 leading-12 px-4 font-medium rounded-xl flex items-center gap-2 border border-gray-100 bg-gray-100 focus-within:bg-white focus-within:border-primary/50 transition-all duration-300`}>
            <input 
                type={showPassword ? 'text' : 'password'} 
                name={name} 
                defaultValue={value} 
                placeholder={placeholder} 
                onChange={onChange} 
                className="w-full font-medium" 
            />
            <button 
                type="button" 
                onClick={()=> setShowPassword(!showPassword)} 
                className="leading-none opacity-0 invisible group-focus-within:visible group-focus-within:opacity-100 text-gray-500 transition-all duration-300"
            >
                <i className={`${showPassword ? 'mc-line-eye-slash' : 'mc-line-eye'} text-lg leading-none`}></i>
            </button>
        </div>
    )
}