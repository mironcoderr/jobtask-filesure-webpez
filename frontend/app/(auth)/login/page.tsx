import Link from "next/link";
import PasswordFieldComponent from "@/components/PasswordFieldComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login"
}

export default function LoginPage() {

    const fieldError = false
    
    return (
        <main className="bg-[url(/images/patterns/turing.jpg)] bg-no-repeat bg-cover">
            <div className="w-dvw h-dvh py-10 px-3 thin-scrolling overflow-y-auto bg-gradient-to-t from-primary/95 to-black/95">
                <Link href="/" className="flex items-center gap-0.5 w-fit mx-auto mb-8 text-white">
                    <i className="mc-fill-file text-3xl"></i>
                    <span className="text-3xl font-bold">webpez</span>
                </Link>
                <form className="relative w-full max-w-sm mx-auto rounded-3xl p-6 mb-8 bg-white">
                    <h3 className="text-xl font-bold text-center mb-6">
                        Login to your account
                    </h3>
                    <div className="mb-4">
                        <label className="block text-xs font-medium capitalize mb-1 field-required">email</label>
                        <input type="email" placeholder="Enter your email" className="w-full h-11 leading-12 px-4 font-medium rounded-xl border border-gray-100 bg-gray-100 focus-within:bg-white focus-within:border-primary/50 transition-all duration-300" />
                        {fieldError && <small className="mt-1 block text-xs font-medium text-danger">This field is required</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-medium capitalize mb-1 field-required">password</label>
                        <PasswordFieldComponent placeholder="Enter your password" />
                        {fieldError && <small className="mt-1 block text-xs font-medium text-danger">This field is required</small>}
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                        <div className="flex items-start gap-2">
                            <input type="checkbox" id="checkbox" className="field-checkbox" />
                            <label htmlFor="checkbox" className="whitespace-nowrap cursor-pointer text-sm font-medium capitalize">
                                remember me
                            </label>
                        </div>
                        <Link href="/forgot-password" className="capitalize text-sm font-semibold text-primary">
                            forgot password
                        </Link>
                    </div>
                    <button type="button" className="w-full h-11 leading-11 px-4 mb-4 font-semibold rounded-full capitalize bg-primary text-white transition-all duration-300">
                        login
                    </button>
                    <p className="text-sm font-medium text-center">
                        Don't have an account? <Link href="/registration" className="inline font-semibold capitalize text-primary">registration</Link>
                    </p>
                </form>
                <Link href="/" className="flex items-center justify-center gap-1.5 h-9 w-fit px-4 mx-auto rounded-full border border-white/50 text-white">
                    <i className="mc-line-undo text-lg"></i>
                    <span className="text-sm font-semibold">Back to Home</span>
                </Link>
            </div>
        </main>
    )
}