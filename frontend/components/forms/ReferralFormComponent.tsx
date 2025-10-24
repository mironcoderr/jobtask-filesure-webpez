"use client"

import { useState } from "react";
import { useAppSelector } from "@/stores/settings/hooks"

export default function ReferralFormComponent() {

    const { user } = useAppSelector(state => state.user);

    const [copied, setCopied] = useState<boolean>(false);

    const referralLink = process.env.NEXT_PUBLIC_SITE_URL + '/registration?refercode=' + user?.referralCode

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopied(true);
            setTimeout(() => { setCopied(false) }, 1500);
        });
    };

    return (
        <form>
            <input
                type="url"
                readOnly={true}
                value={referralLink}
                className="w-full text-sm font-medium text-ellipsis px-4 mb-4 h-10 rounded-full border border-primary/15 text-primary"
            />
            <button onClick={handleCopyLink} type="button" className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-white bg-primary">
                <i className={copied ? "mc-fill-check" : "mc-fill-copy" + " text-lg"}></i>
                <span className="text-sm font-semibold capitalize">
                    {copied ? "copied!" : "copy link"}
                </span>
            </button>
        </form>
    )
}