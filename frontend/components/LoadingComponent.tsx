import { useTranslations } from "next-intl"

export default function LoadingComponent() {

    const t = useTranslations();

    return (
        <div className="w-full h-80 flex flex-col items-center justify-center gap-4 text-paragraph">
            <i className="mc-fill-database text-5xl text-gray-300"></i>
            <div className="flex items-center justify-center gap-2">
                <i className="mc-line-update animate-spin"></i>
                <span className="capitalize">{t('text.loading')}</span>
            </div>
        </div>
    )
}