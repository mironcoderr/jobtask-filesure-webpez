import Link from "next/link"

import { Legal } from "@/types/legal"
import { Social } from "@/types/social"
import { Support } from "@/types/support"
import { Contact } from "@/types/contact"

import legals from "@/json/legals.json"
import socials from "@/json/socials.json"
import supports from "@/json/supports.json"
import contacts from "@/json/contacts.json"

export default function ClientLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
        {/*=================================
                HEADER PART START 
        ==================================*/}
        <header className="absolute top-0 left-0 z-30 py-6 w-full">
            <div className="container">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-0.5 text-white">
                        <i className="mc-fill-file text-3xl"></i>
                        <span className="text-3xl font-bold">webpez</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/registration" className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full border border-white text-white">
                            <i className="mc-fill-pos text-lg"></i>
                            <span className="text-sm font-semibold capitalize">registration</span>
                        </Link>
                        <Link href="/login" className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-primary bg-white">
                            <i className="mc-fill-circle-user text-lg"></i>
                            <span className="text-sm font-semibold capitalize">log in</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
        {/*=================================
                HEADER PART END 
        ==================================*/}


        {children}
        

        {/*=================================
                FOOTER PART START 
        ==================================*/}
        <footer className="bg-gradient-to-t from-primary to-black">
            <a href='#' className='w-12 h-12 mx-auto mb-3 -translate-y-6 rounded-full flex items-center justify-center border-2 border-white text-white bg-primary'>
                <i className="mc-line-arrow-up text-2xl"></i>
            </a>
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-4 mb-6 lg:mb-0">
                        <div className="sm:max-lg:text-center sm:max-lg:mx-auto w-full max-w-xs">
                            <Link href="/" className="flex items-center gap-0.5 text-white">
                                <i className="mc-fill-file text-3xl"></i>
                                <span className="text-3xl font-bold">webpez</span>
                            </Link>
                            <form className="mt-4 mb-6 block">
                                <label className="mb-2 font-medium text-white">Subscribe to our newsletter</label>
                                <div className="flex w-full h-10 rounded-3xl p-1 bg-white">
                                    <input type="text" placeholder="Your email address" className="w-full h-full pl-3 pr-2 text-sm text-paragraph" />
                                    <button type="submit" className="text-xs font-semibold capitalize flex-shrink-0 px-3 h-full rounded-3xl bg-primary text-white">Subscribe</button>
                                </div>
                            </form>
                            <nav className="flex flex-wrap items-center sm:max-lg:justify-center gap-4">
                                {socials.map((social: Social, index: number) => (
                                    <Link 
                                        key={index} 
                                        target='_blank' 
                                        href={social.path} 
                                        className={
                                            social.icon + ' ' + social.bg + ' ' +
                                            'w-7 text-sm aspect-square rounded-full !flex items-center justify-center shadow text-white transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 duration-300'
                                        }>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-6 sm:col-span-4 mb-4 sm:mb-0">
                                <h4 className="text-xl font-semibold capitalize mb-6 text-white">Support</h4>
                                <nav className="flex flex-col gap-4">
                                    {supports.map((support: Support, index: number) => (
                                        <Link 
                                            key={index}
                                            href={support.path}
                                            className="w-fit text-sm capitalize text-white transition-all duration-300 hover:text-primary">
                                            {support.menu}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                            <div className="col-span-6 sm:col-span-4 mb-4 sm:mb-0">
                                <h4 className="text-xl font-semibold capitalize mb-6 text-white">Legal</h4>
                                <nav className="flex flex-col gap-4">
                                    {legals.map((legal: Legal, index: number) => (
                                        <Link
                                            key={index}
                                            href={legal.path}
                                            className="w-fit text-sm capitalize text-white transition-all duration-300 hover:text-primary">
                                            {legal.menu}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                            <div className="col-span-12 sm:col-span-4">
                                <h4 className="text-xl font-semibold capitalize mb-6 text-white">Contact</h4>
                                <ul className="flex flex-col gap-5">
                                    {contacts.map((contact: Contact, index: number) => (
                                        <li key={index} className="flex gap-3 items-start">
                                            <i className={`${contact.icon} text-lg text-white`}></i>
                                            <span className="text-sm text-white">{contact.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4 mt-8 text-center border-t border-white/5">
                <p className="text-xs text-gray-300">Developed by MironMahmud © All Rights Reserved by 🧡 webpez.</p>
            </div>
        </footer>
        {/*=================================
                FOOTER PART END 
        ==================================*/}
        </>
    )
}