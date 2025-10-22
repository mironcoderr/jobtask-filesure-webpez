"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function PreloaderComponent({ children }: { children?: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const textRef = useRef<SVGTextElement>(null);

    // Handle initial page load
    useLayoutEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
                setFirstLoad(false);
            }, 2500); // Slightly longer on hard reload
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    // Animate SVG text draw
    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        const length = text.getComputedTextLength();

        // Reset stroke for re-animation
        text.style.strokeDasharray = `${length}`;
        text.style.strokeDashoffset = `${length}`;
        text.style.transition = "none";

        void text.getBoundingClientRect(); // force reflow

        requestAnimationFrame(() => {
            text.style.transition = `stroke-dashoffset ${firstLoad ? 2.5 : 2}s ease`;
            text.style.strokeDashoffset = "0";
        });
    }, [isLoading]);

    // Preloader screen
    if (isLoading) {
        return (
            <div className="bg-primary overflow-hidden flex items-center justify-center h-dvh">
                <svg
                    viewBox="0 0 1000 200"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full max-w-5xl h-auto"
                >
                    <text
                        ref={textRef}
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize="110"
                        fontWeight="900"
                        letterSpacing="5"
                        stroke="#fff"
                        fill="none"
                        strokeWidth="2"
                        className="uppercase"
                    >
                        restfood
                    </text>
                </svg>
            </div>
        );
    }

    // Actual page content
    return children;
}
