"use client"

import Image from "next/image";
import useCanvas from "@/hooks/canvas";
import LoadingComponent from "./LoadingComponent";

interface CanvasComponentTypes {
    id?: string,
    size?: string,
    title?: string,
    isLoaded?: boolean,
    blankSlot?: boolean;
    direction?: "left" | "right",
    children?: React.ReactNode,
}

export default function CanvasComponent({ 
    id = "canvas", 
    size = "max-w-md",
    title,
    isLoaded = false, 
    blankSlot = false,
    direction = "right",
    children = null,
}: CanvasComponentTypes) {

    const { closeCanvas, closeBackdrop } = useCanvas();

    return (
        <div 
            id={id}
            onClick={closeBackdrop}
            className="fixed inset-0 z-50 bg-black/50 duration-500 transition-all invisible opacity-0"
        >
            <div className={`
                    ${size} 
                    ${direction === "right" ? "ms-auto ltr:rounded-l-xl rtl:rounded-r-xl ltr:translate-x-full rtl:-translate-x-full" : "ltr:rounded-r-xl rtl:rounded-l-xl ltr:-translate-x-full rtl:translate-x-full"}
                    w-full h-dvh overflow-y-auto thin-scrolling bg-white
                `}
            >
                {!isLoaded ?
                    <div className="relative flex items-center justify-center h-dvh">
                        <button onClick={()=> closeCanvas(id)} className="absolute top-4 ltr:right-4 rtl:left-4 leading-none">
                            <i className="mc-fill-close-circle text-2xl leading-none text-danger"></i>
                        </button>
                        <LoadingComponent />
                    </div>
                :
                    blankSlot ? children :
                    <>
                        <div className="flex items-center justify-between gap-2 p-4">
                            {title ? 
                                <h3 className="text-lg font-bold capitalize">{ title }</h3>
                                :
                                <Image src="/images/logo.png" alt="logo" width={200} height={200} className="w-36"/>
                            }
                            <button onClick={() => closeCanvas(id)} type="button" className="mc-fill-close-circle text-2xl leading-none text-danger"></button>
                        </div>
                        {children}
                    </>
                }
            </div>
        </div>
    )
}