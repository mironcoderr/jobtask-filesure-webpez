import mongoose from "mongoose";
import { User } from "../models/userModel";
import { Refer } from "../models/referModel";
import { Purchase } from "../models/purchaseModel";
import { ReferStatusEnum } from "../enums/referStatusEnum";
import { ReferCreditEnum } from "../enums/referCreditEnum";


export const purchaseService = async (
    buyerId: mongoose.Types.ObjectId,
    productId?: mongoose.Types.ObjectId | null
) => {

    const buyer = await User.findById(buyerId);
    if(!buyer) return { message: "Buyer not found!" }

    const purchaseCount = await Purchase.countDocuments({buyerId});
    const isFirstPurchaseForBuyer = purchaseCount === 0;

    const purchase = await Purchase.create({
        buyerId,
        productId: productId ?? null,
        isFirstPurchaseForBuyer
    });

    // FIRST REFERRED USER PURCHASE AND GET CREDITS BOTH
    if(isFirstPurchaseForBuyer && buyer.referredBy) {
        const referrerId = buyer.referredBy as mongoose.Types.ObjectId

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            await User.findByIdAndUpdate(
                buyerId,
                { $inc: { credits: ReferCreditEnum.REFERRED_CREDIT } },
                { session }
            )

            await User.findByIdAndUpdate(
                referrerId,
                { $inc: { credits: ReferCreditEnum.REFERRER_CREDIT } },
                { session }
            )

            await Refer.findOneAndUpdate(
                { referrerId, referredId: buyerId },
                { status: ReferStatusEnum.CONVERTED, convertedAt: new Date() },
                { session }
            )

            await session.commitTransaction();
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("Purchase Transaction failed, rolling back:", error);
            return { message: "Failed to credit users for first purchase" }
        }

        session.endSession();

        return {
            purchase,
            credited: true,
            message: "You are earned 2 credits for first purchase"
        };
    }

    // NO CREDITS REFERRED AFTER FIRST PURCHASE
    if (!isFirstPurchaseForBuyer && buyer.referredBy) {
        return {
            purchase,
            credited: false,
            message: "After first purchase you dont get any credits"
        };
    }

    // NO CREDITS WITHOUT REFRRED
    return {
        purchase,
        credited: false,
        message: "Purchase completed but without reffered user you dont have credit"
    }
}