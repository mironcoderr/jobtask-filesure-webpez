import Link from "next/link"
import Image from "next/image"

import features from "@/json/features.json"
import products from "@/json/products.json"
import technologies from "@/json/technologies.json"

import { Feature } from "@/types/feature"
import { Product } from "@/types/product"
import { Technology } from "@/types/technology"
import type { Metadata } from "next";
import ClientPurchaseButtonComponent from "@/components/buttons/ClientPurchaseButtonComponent"

export const metadata: Metadata = {
    title: "Home"
}

export default async function HomePage({searchParams}: { searchParams: any }) {

    const searchParam = await searchParams

    const allProducts: Product[][] = [[], []];

    (products as Product[]).forEach((product: Product, index: number) => {
        allProducts[index % 2].push(product);
    });

    return (
        <>
        {/*=================================
                BANNER PART START 
        ==================================*/}
        <section className="bg-[url(/images/patterns/matrics.jpg)] bg-no-repeat bg-cover bg-center">
            <div className="pt-36 pb-24 bg-gradient-to-b from-primary via-black to-primary/95">
                <div className="container relative">
                    <i className="mc-line-code animate-pulse text-4xl absolute -top-10 left-0 text-white/10"></i>
                    <i className="mc-line-cube-sticker animate-pulse text-4xl absolute -top-10 right-0 text-white/10"></i>
                    <i className="mc-line-notes animate-pulse text-4xl absolute -top-15  left-1/2 text-white/10"></i>
                    <i className="mc-line-layer animate-pulse text-4xl absolute -top-25  left-1/4 text-white/10"></i>
                    <i className="mc-line-theme animate-pulse text-4xl absolute -top-25  left-2/3 text-white/10"></i>
                    <h1 className="mb-8 mx-auto max-w-5xl text-4xl md:text-5xl leading-tight font-bold text-center text-white">
                        Join the #1 Platform for Business & Startup Frontend Template Marketplace
                    </h1>
                    <ul className="mb-16 flex flex-wrap items-center justify-center gap-4">
                        {technologies.map((technology: Technology, index: number) => (
                            <li key={index} className="w-12 aspect-square rounded-full flex-shrink-0 flex items-center justify-center backdrop-blur shadow-lg bg-gradient-to-t from-white to-white/60">
                                <Image src={technology.image} alt={technology.name} width={100} height={100} className={
                                    technology.name === 'html' ? 'w-5'
                                    : technology.name === 'pinia' ? 'w-5'
                                    : technology.name === 'react' ? 'w-6 brightness-50'
                                    : technology.name === 'tailwindcss' ? 'w-6 brightness-50'
                                    : 'w-6'
                                } />
                            </li>
                        ))}
                    </ul>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {features.map((feature: Feature, index: number) => (
                            <li key={index} className="p-4 sm:p-6 rounded-2xl backdrop-blur bg-gradient-to-b from-black to-transparent text-white">
                                <i className={feature.icon + ' text-4xl brightness-150 mb-4 text-primary'}></i>
                                <span className="text-base">{feature.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
        {/*=================================
                BANNER PART END 
        ==================================*/}


        {/*=================================
                TEMPLATE PART START 
        ==================================*/}
        <section className="py-12 sm:py-16 md:py-24">
            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    {allProducts.map((products: Product[], index: number) => (
                        <div key={index} className="w-full">
                            {index === 0 && (
                                <div className="mb-10 md:mb-20 max-w-lg max-md:mx-auto max-md:text-center">
                                    <h2 className="mb-6 text-2xl sm:text-4xl font-bold capitalize">explore our ready-made frontend templates</h2>
                                    <p className="text-lg">Discover modern, responsive, and easy-to-customize templates built with the latest technologies — designed to accelerate your workflow and elevate your online presence.</p>
                                </div>
                            )}
                            {products.map((product: Product, idx: number) => (
                                <div
                                    key={idx}
                                    style={{ backgroundImage: `linear-gradient(to bottom right, rgb(${product.brand_color} / 5%), rgb(0 0 0 / 1%))` }}
                                    className="group w-full mb-12 last:mb-0 pt-6 lg:pt-8 px-6 lg:px-8 rounded-3xl relative"
                                >
                                    <div className="absolute -top-1 -right-1 z-20 w-12 lg:w-14 aspect-square rounded-full flex items-center justify-center border-2 border-white bg-primary">
                                        <p className="text-sm lg:text-xl font-semibold text-white"><span className="font-sans">$</span>{product.price.regular}</p>
                                    </div>
                                    <Image src={`/images/products/logos/${product.name}.png`} alt={product.name} width={200} height={200} className="w-36 mb-5" />
                                    <h3 className="text-lg lg:text-xl max-w-lg font-semibold first-letter:capitalize mb-6">{product.title}</h3>
                                    <ul className="flex flex-wrap gap-3 mb-10">
                                        {product.technologies.map((technology: Technology, techIndex: number) => (
                                            <li key={techIndex} className="inline-flex items-center gap-1.5 py-1.5 px-2 rounded-full bg-gradient-to-r from-white to-primary/10">
                                                <Image src={technology.image} alt={technology.name} width={50} height={50} className="h-3 w-auto" />
                                                <span className="text-xs font-medium capitalize tracking-wide whitespace-nowrap">{technology.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <figure className="flex items-end">
                                        <Image src={`/images/products/pages/${product.name}.jpg`} alt={product.name} width={400} height={400} className="w-3/5 h-60 lg:h-80 object-cover object-top shadow-page z-10" />
                                        <Image src={`/images/products/pages/${product.name}.jpg`} alt={product.name} width={400} height={400} className="w-1/2 h-40 lg:h-60 object-cover object-bottom shadow-page -ml-8" />
                                    </figure>
                                    <div className='absolute inset-0 z-10 rounded-3xl flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-primary to-black/20 transition duration-300 opacity-0 invisible group-hover:visible group-hover:opacity-100'>
                                        <Link target="_blank" href={product.path} className='px-4 h-10 rounded-full shadow-xl flex items-center justify-center gap-1.5 text-heading bg-white'>
                                            <i className="mc-line-export-link text-lg flex-shrink-0"></i>
                                            <span className="text-sm font-medium capitalize whitespace-nowrap">live preview</span>
                                        </Link>
                                        <ClientPurchaseButtonComponent />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
        {/*=================================
                TEMPLATE PART END 
        ==================================*/}


        {/*=================================
              SUCCESS MODAL PART START 
        ==================================*/}
        {searchParam.credit === "success" &&
            <div className="fixed inset-0 z-50 p-3 overflow-y-auto thin-scrolling backdrop-blur bg-black/50 transition-all duration-300">
                <div className="w-full max-w-sm relative rounded-2xl mx-auto my-5 p-6 text-center bg-white transition-all duration-300">
                    <Link href="/" className="absolute top-3 right-3">
                        <i className="mc-fill-close-circle text-xl text-danger"></i>
                    </Link>
                    <i className="mb-4 mc-fill-wallet text-6xl text-transparent bg-clip-text bg-gradient-to-t from-primary to-primary/50"></i>
                    <h3 className="mb-2 text-xl font-semibold text-heading">You have earned 2 credits!</h3>
                    <p className="mb-8">Your account has been credited with 2 points for your recent purchase. You can now use these credits towards future purchases or rewards on our platform.</p>
                    <Link href="/dashboard" className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-primary/50 text-primary">
                        <i className="mc-fill-grid text-lg"></i>
                        <span className="text-sm font-semibold">Check the Dashboard</span>
                    </Link>
                </div>
            </div>
        }
        {/*=================================
              SUCCESS MODAL PART END 
        ==================================*/}
        </>
    )
}  