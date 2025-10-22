import PageTransitionComponent from '@/components/PageTransitionComponent';
import PreloaderComponent from '@/components/PreloaderComponent';
import { Toaster } from 'react-hot-toast';
import { Urbanist } from "next/font/google";
import StoreProvider from './provider';
import type { Metadata } from "next";
import "@/public/icons/iconly.css";
import "./globals.css";

const googleFont = Urbanist({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: { template: "webpez :: %s", default: "webpez" },
    description: "webpez - Multivendor Online Food Delivery & Pickup PWA Nextjs Template",
    authors: [{ name: "Miron Mahmud", url: "https://mironmahmud.com" }],
    creator: "Miron Mahmud",
    publisher: "Miron Mahmud"
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <StoreProvider>
            <html lang="en" dir="ltr">
                <body className={`${googleFont.className} antialiased`}>
                    <PageTransitionComponent>
                        {children}
                    </PageTransitionComponent>
                    <Toaster
                        toastOptions={{
                            style: {
                                padding: "8px 16px",
                                borderRadius: "12px",
                            },
                        }}
                    />
                </body>
            </html>
        </StoreProvider>
    );
}