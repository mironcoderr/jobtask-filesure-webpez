import LoginFormComponent from "@/components/forms/LoginFormComponent";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login"
}

export default function LoginPage() {    
    return (
        <main className="bg-[url(/images/patterns/turing.jpg)] bg-no-repeat bg-cover">
            <div className="w-dvw h-dvh py-10 px-3 thin-scrolling overflow-y-auto bg-gradient-to-t from-primary/95 to-black/95">
                <Link href="/" className="flex items-center gap-0.5 w-fit mx-auto mb-8 text-white">
                    <i className="mc-fill-file text-3xl"></i>
                    <span className="text-3xl font-bold">webpez</span>
                </Link>
                
                <LoginFormComponent />

                <Link href="/" className="flex items-center justify-center gap-1.5 h-9 w-fit px-4 mx-auto rounded-full border border-white/50 text-white">
                    <i className="mc-line-undo text-lg"></i>
                    <span className="text-sm font-semibold">Back to Home</span>
                </Link>
            </div>
        </main>
    )
}