import { Refer } from "../models/referModel";
import { User } from "../models/userModel";

export const getRegisteredUsersService = async () => {
    const users = await User.find();
    return users;
};

export const getSingleUserService = async (userId: string) => {
    const user = await User.findById(userId);
    return user
};

export const getReferredUsersService = async (userId: string) => {
    const referrals = await Refer.find({ referrerId: userId })
        .populate("referredId", "name email credits") // only get name and email
        .lean();

    return referrals.map(r => {
        const referred = r.referredId as any;
        
        return {
            name: referred?.name ?? null,
            email: referred?.email ?? null,
            status: r.status,
            credits: referred?.credits ?? null,
            convertedAt: r.convertedAt
        };
    });
};