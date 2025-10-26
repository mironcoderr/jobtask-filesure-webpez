import Image from "next/image"
import { User } from "@/types/user"
import { Referral } from "@/types/referral";
import { UserRoleEnum } from "@/enums/userRoleEnum";
import { ReferStatusEnum } from "@/enums/referStatusEnum";
import { getRegisteredUsers, getReferredUsers, getMyData } from "@/library/user"
import ReferralFormComponent from "@/components/forms/ReferralFormComponent";

export default async function DashboardPage() {

    const mydata = await getMyData();
    const allUsers = await getRegisteredUsers();
    const myReferrals = await getReferredUsers();

    
    // FOR ADMIN
    const organicUsers = allUsers.filter((user: User)=> user.referredBy == null);
    const referredUsers = allUsers.filter((user: User)=> user.referredBy !== null);
    const totalCredits = allUsers.reduce((acc: number, user: User)=> acc + user.credits, 0);
    
    // FOR CLIENT
    const convertedUsers = myReferrals.filter((r: Referral)=> r.status === ReferStatusEnum.CONVERTED);
    const pendingUsers = myReferrals.filter((r: Referral)=> r.status === ReferStatusEnum.PENDING);
    
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="order-2 xl:order-1 col-span-12 xl:col-span-3 rounded-2xl overflow-hidden bg-[url(/images/bg/curve.jpg)] bg-no-repeat bg-cover">
                <div className="h-full bg-gradient-to-r from-black/5 to-white/90">
                    <Image src="/images/bg/poly.jpg" alt="poly-background" width={300} height={200} className="w-full h-24" />
                    <Image src="/images/avatar.webp" alt="avatar" width={100} height={100} className="w-20 rounded-full mx-auto -mt-10 mb-3 relative z-10 border-2 border-white" />
                    <h3 className="text-lg font-semibold capitalize text-center mb-0.5">{mydata?.name}</h3>
                    <p className="text-base text-center mb-6">{mydata?.email}</p>
                    <div className="flex items-center gap-2 py-4 px-6 border-y border-primary/10">
                        <div className="flex-auto rtl:text-right ltr:text-left">
                            <span className="text-sm block capitalize mb-1">wallet balance</span>
                            <h3 className="text-2xl font-semibold">$435.00</h3>
                        </div>
                        <i className="mc-line-wallet-money text-4xl leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/50"></i>
                    </div>
                    <div className="p-6">
                        <h4 className="text-lg font-semibold mb-2">Invite Friends, Earn Rewards!</h4>
                        <p className="text-sm mb-4">Love our platform? Spread the word! Share your referral link and get rewarded when your friends join and make their first purchase.</p>
                        <ReferralFormComponent />
                    </div>
                </div>
            </div>
            <div className="order-1 xl:order-2 col-span-12 xl:col-span-9">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center gap-4 p-4 h-24 rounded-2xl bg-gradient-to-l from-black/5 to-red-50">
                        <div className="flex-auto">
                            <h3 className="text-2xl font-semibold mb-2">
                                {mydata?.role === UserRoleEnum.ADMIN ? allUsers.length : myReferrals.length}
                            </h3>
                            <p className="text-base capitalize">
                                {(mydata?.role === UserRoleEnum.ADMIN ? 'registered' : 'referred') + ' users'}
                            </p>
                        </div>
                        <i className="mc-line-users text-3xl text-red-600"></i>
                    </div>
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center gap-4 p-4 h-24 rounded-2xl bg-gradient-to-l from-black/5 to-yellow-50">
                        <div className="flex-auto">
                            <h3 className="text-2xl font-semibold mb-2">
                                {mydata?.role === UserRoleEnum.ADMIN ? referredUsers.length : pendingUsers.length}
                            </h3>
                            <p className="text-base capitalize">
                                {(mydata?.role === UserRoleEnum.ADMIN ? 'referred' : 'pending') + ' users'}
                            </p>
                        </div>
                        <i className="mc-line-keyboard-open text-3xl text-yellow-600"></i>
                    </div>
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center gap-4 p-4 h-24 rounded-2xl bg-gradient-to-l from-black/5 to-green-50">
                        <div className="flex-auto">
                            <h3 className="text-2xl font-semibold mb-2">
                                {mydata?.role === UserRoleEnum.ADMIN ? organicUsers.length : convertedUsers.length}
                            </h3>
                            <p className="text-base capitalize">
                                {(mydata?.role === UserRoleEnum.ADMIN ? 'organic' : 'converted') + ' users'}
                            </p>
                        </div>
                        <i className="mc-line-element-plus text-3xl text-green-600"></i>
                    </div>
                    <div className="col-span-12 sm:col-span-6 xl:col-span-3 flex items-center gap-4 p-4 h-24 rounded-2xl bg-gradient-to-l from-black/5 to-blue-50">
                        <div className="flex-auto">
                            <h3 className="text-2xl font-semibold mb-2">
                                {mydata?.role === UserRoleEnum.ADMIN ? totalCredits : mydata?.credits}
                            </h3>
                            <p className="text-base capitalize">
                                {mydata?.role === UserRoleEnum.ADMIN ? 'total credits' : 'earned credits'}
                            </p>
                        </div>
                        <i className="mc-line-benefits text-3xl text-blue-600"></i>
                    </div>

                    {mydata?.role === UserRoleEnum.ADMIN &&
                        <div className="col-span-12">
                            <h3 className="text-lg font-semibold capitalize mb-3">all registered users</h3>
                            <div className="rounded-2xl overflow-x-auto">
                                <table className="w-full ltr:text-left rtl:text-right">
                                    <thead className="text-xs uppercase text-white bg-primary">
                                        <tr>
                                            <th scope="col" className="px-4 py-3.5">id</th>
                                            <th scope="col" className="px-4 py-3.5">name</th>
                                            <th scope="col" className="px-4 py-3.5">email</th>
                                            <th scope="col" className="px-4 py-3.5">referral code</th>
                                            <th scope="col" className="px-4 py-3.5">referred by</th>
                                            <th scope="col" className="px-4 py-3.5">credits</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-medium">
                                        {allUsers.map((user: User, index: number) => (
                                            <tr key={index} className="odd:bg-white even:bg-primary/5">
                                                <th scope="row" className="px-4 py-4 text-ellipsis max-w-20 overflow-hidden">#{user._id}</th>
                                                <td className="px-4 py-4">{user.name}</td>
                                                <td className="px-4 py-4">{user.email}</td>
                                                <td className="px-4 py-4">{user.referralCode}</td>
                                                <td className="px-4 py-4 text-ellipsis max-w-20 overflow-hidden">{user.referredBy ?? '---'}</td>
                                                <td className="px-4 py-4">{user.credits}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                    {mydata?.role === UserRoleEnum.CLIENT &&
                        <div className="col-span-12">
                            <h3 className="text-lg font-semibold capitalize mb-3">my referral users</h3>
                            <div className="rounded-2xl overflow-x-auto">
                                <table className="w-full ltr:text-left rtl:text-right">
                                    <thead className="text-xs uppercase text-white bg-primary">
                                        <tr>
                                            <th scope="col" className="px-4 py-3.5">name</th>
                                            <th scope="col" className="px-4 py-3.5">email</th>
                                            <th scope="col" className="px-4 py-3.5">status</th>
                                            <th scope="col" className="px-4 py-3.5">credits</th>
                                            <th scope="col" className="px-4 py-3.5">converted at</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-medium">
                                        {myReferrals.length > 0 ?
                                            myReferrals.map((referral: Referral, index: number) => (
                                                <tr key={index} className="odd:bg-white even:bg-primary/5">
                                                    <td className="px-4 py-4">{referral.name}</td>
                                                    <td className="px-4 py-4">{referral.email}</td>
                                                    <td className="px-4 py-4">
                                                        {referral.status === ReferStatusEnum.PENDING && <span className="capitalize text-yellow-500">pending</span>}
                                                        {referral.status === ReferStatusEnum.CONVERTED && <span className="capitalize text-green-500">converted</span>}
                                                    </td>
                                                    <td className="px-4 py-4">{referral.credits}</td>
                                                    <td className="px-4 py-4">{referral.convertedAt ?? '---'}</td>
                                                </tr>
                                            ))
                                        :
                                        <tr>
                                            <td colSpan={5} className=" text-center py-8">
                                                <i className="mc-fill-database text-6xl mb-5 text-gray-300"></i>
                                                <span className="block text-xl text-gray-400">No Referral users</span>
                                            </td>
                                        </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}