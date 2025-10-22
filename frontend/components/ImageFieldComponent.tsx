"use client"

import Image from 'next/image';
import useUpload from '@/hooks/upload';
import { useTranslations } from 'next-intl';

interface ImageFieldProps {
    id: string;
    ratio: string;
}

export default function ImageFieldComponent({ id, ratio }: ImageFieldProps) {

    const t = useTranslations();
    const { handleUpload, handleCancel, imageSource } = useUpload();

    return (
        imageSource ?
            <div className='relative'>
                <Image src={imageSource} width={500} height={500} alt='banner' className='w-full h-40 rounded-lg object-cover'/>
                <button onClick={handleCancel} className='mc-line-cross-2 font-bold absolute -top-1 -right-1 w-6 h-6 leading-6 text-center rounded-full bg-white text-danger'></button>
            </div>
        :
        <label htmlFor={id} className='p-4 flex flex-col items-center justify-center text-center w-full h-40 rounded-lg cursor-pointer bg-gray-100'>
            <input type="file" id={id} onChange={handleUpload} hidden />
            <i className='mc-line-gallery-add text-3xl mb-2 text-placeholder'></i>
            <span className='text-sm text-primary'>{t('suggest.size_ratio')} {ratio}</span>
            <span className='text-sm text-placeholder'>{t('suggest.image_size')}</span>
        </label>                                        
    )
}