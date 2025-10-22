"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransitionComponent({ children }: { children?: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{
                    scale: 0.98,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    transition: { duration: 0.5, ease: "easeOut" },
                }}
                exit={{
                    scale: 0.98,
                    opacity: 0,
                    transition: { duration: 0.3, ease: "easeIn" },
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
