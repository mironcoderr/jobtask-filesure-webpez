import Image from "next/image"
import users from "@/json/users.json"
import { User } from "@/types/user"

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 rounded-2xl overflow-hidden bg-[url(/images/bg/curve.jpg)] bg-no-repeat bg-cover">
                <div className="bg-gradient-to-r from-black/5 to-white/90">
                    <Image src="/images/bg/poly.jpg" alt="poly-background" width={300} height={200} className="w-full h-25" />
                    <Image src="/images/avatar.webp" alt="avatar" width={100} height={100} className="w-20 rounded-full mx-auto -mt-10 mb-3 relative z-10 border-2 border-white" />
                    <h3 className="text-lg font-semibold capitalize text-center mb-0.5">miron mahmud</h3>
                    <p className="text-base text-center mb-6">mironcoder@gmail.com</p>
                    <div className="flex items-center gap-2 py-4 px-6 border-y border-primary/10">
                        <div className="flex-auto rtl:text-right ltr:text-left">
                            <span className="text-sm block capitalize mb-1">wallet balance</span>
                            <h3 className="text-2xl font-semibold">$435.00</h3>
                        </div>
                        <i className="mc-line-wallet-money text-4xl leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/50"></i>
                    </div>
                    <form className="p-6">
                        <h4 className="text-lg font-semibold mb-2">Invite Friends, Earn Rewards!</h4>
                        <p className="text-sm mb-4">Love our platform? Spread the word! Share your referral link and get rewarded when your friends join and make their first purchase.</p>
                        <input
                            type="url"
                            defaultValue="https://webpez.com/registration?r=mironmahmud"
                            className="w-full text-sm font-medium text-ellipsis px-4 mb-4 h-10 rounded-full border border-primary/15 text-primary"
                        />
                        <button type="button" className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-white bg-primary">
                            <i className="mc-fill-copy text-lg"></i>
                            <span className="text-sm font-semibold capitalize">copy link</span>
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-span-9 h-80 ">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4 flex items-center gap-4 p-4 h-25 rounded-2xl bg-gradient-to-l from-black/5 to-red-50">
                        <div className="flex-auto">
                            <h3 className="text-3xl font-semibold mb-1">34</h3>
                            <p className="text-lg capitalize">referred users</p>
                        </div>
                        <i className="mc-line-users text-4xl text-red-600"></i>
                    </div>
                    <div className="col-span-4 flex items-center gap-4 p-4 h-25 rounded-2xl bg-gradient-to-l from-black/5 to-green-50">
                        <div className="flex-auto">
                            <h3 className="text-3xl font-semibold mb-1">25</h3>
                            <p className="text-lg capitalize">converted users</p>
                        </div>
                        <i className="mc-line-element-plus text-4xl text-green-600"></i>
                    </div>
                    <div className="col-span-4 flex items-center gap-4 p-4 h-25 rounded-2xl bg-gradient-to-l from-black/5 to-blue-50">
                        <div className="flex-auto">
                            <h3 className="text-3xl font-semibold mb-1">16</h3>
                            <p className="text-lg capitalize">earned credits</p>
                        </div>
                        <i className="mc-line-benefits text-4xl text-blue-600"></i>
                    </div>
                    <div className="col-span-12">
                        <h3 className="text-lg font-semibold capitalize mb-3">registered users</h3>
                        <div className="rounded-2xl overflow-x-auto">
                            <table className="w-full ltr:text-left rtl:text-right">
                                <thead className="text-xs uppercase text-white bg-primary">
                                    <tr>
                                        <th scope="col" className="px-4 py-3.5">id</th>
                                        <th scope="col" className="px-4 py-3.5">name</th>
                                        <th scope="col" className="px-4 py-3.5">email</th>
                                        <th scope="col" className="px-4 py-3.5">created at</th>
                                        <th scope="col" className="px-4 py-3.5">referral</th>
                                        <th scope="col" className="px-4 py-3.5">invited</th>
                                        <th scope="col" className="px-4 py-3.5">registered</th>
                                        <th scope="col" className="px-4 py-3.5">earned</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-medium">
                                    {users.map((user: User, index: number) => (
                                        <tr key={index} className="odd:bg-white even:bg-primary/5">
                                            <th scope="row" className="px-4 py-4">#{user.id}</th>
                                            <td className="px-4 py-4">{user.name}</td>
                                            <td className="px-4 py-4">{user.email}</td>
                                            <td className="px-4 py-4">{user.createdAt}</td>
                                            <td className="px-4 py-4">{user.referral}</td>
                                            <td className="px-4 py-4">{user.invited}</td>
                                            <td className="px-4 py-4">{user.registered}</td>
                                            <td className="px-4 py-4">${user.earned}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}