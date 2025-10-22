"use client"

import useModal from "@/hooks/modal";
import LoadingComponent from "./LoadingComponent";

interface ModalComponentTypes {
    id?: string,
    size?: string,
    title?: string,
    isLoaded?: boolean,
    blankSlot?: boolean;
    children?: React.ReactNode,
}

export default function ModalComponent({ 
    id = "modal", 
    size = "max-w-md",
    title = "modal title",
    isLoaded = false, 
    blankSlot = false,
    children = null,
}: ModalComponentTypes) {

    const { closeModal, closeBackdrop } = useModal();

    return (
        <div onClick={closeBackdrop} id={id} className="fixed inset-0 z-50 p-3 overflow-y-auto thin-scrolling bg-black/50 transition-all duration-300 opacity-0 invisible">
            <div className={`${size} w-full rounded-xl mx-auto bg-white transition-all duration-300`}>
                {!isLoaded ?
                    <div className="relative">
                        <button onClick={()=> closeModal(id)} className="absolute top-4 ltr:right-4 rtl:left-4 leading-none">
                            <i className="mc-fill-close-circle text-2xl leading-none text-danger"></i>
                        </button>
                        <LoadingComponent />
                    </div>
                :
                    blankSlot ? children :
                    <>
                        <div className="flex items-center justify-between gap-2 p-4">
                            <h3 className="text-lg font-bold capitalize">{ title }</h3>
                            <button onClick={() => closeModal(id)} type="button" className="mc-fill-close-circle text-2xl leading-none text-danger"></button>
                        </div>
                        {children}
                    </>
                }
            </div>
        </div>
    )
}