"use client"

import { useState } from "react";
import PhoneFieldComponent from "@/components/global/PhoneFieldComponent";
import { useTranslations } from "next-intl";

export default function ToggleFieldComponent({
    emailValue,
    phoneValue,
}: {
    defaultType?: string,
    emailValue?: string,
    phoneValue?: string,
}) {

    const [fieldSelect, setFieldSelect] = useState("email");
    const t = useTranslations();

    return (
        <>
        <div className="flex items-center justify-between gap-2 mb-1">
            <label className="block text-xs font-medium capitalize mb-1 field-required">{fieldSelect}</label>
            {fieldSelect === "phone" && <button onClick={()=> setFieldSelect('email')} type="button" className="block text-xs font-medium capitalize text-primary">{t('button.use_email_instead')}</button>}
            {fieldSelect === "email" && <button onClick={()=> setFieldSelect('phone')} type="button" className="block text-xs font-medium capitalize text-primary">{t('button.use_phone_instead')}</button>}
        </div>
        {fieldSelect === "phone" && <PhoneFieldComponent value={phoneValue} />}
        {fieldSelect === "email" && <input type="email" defaultValue={emailValue} placeholder="Enter your email" className="w-full h-11 leading-12 px-4 font-medium rounded-lg border border-gray-100 bg-gray-100 focus-within:bg-white focus-within:border-primary/50 transition-all duration-300" />}
        </>
    )
}