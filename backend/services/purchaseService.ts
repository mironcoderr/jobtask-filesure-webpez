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

    if(!buyer) {
        return { 
            message: "Buyer not found!" 
        }
    }

    const purchase = await Purchase.create({
        buyerId,
        productId: productId ?? null,
    });

    const referrerId = buyer.referredBy as mongoose.Types.ObjectId

    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        await User.findByIdAndUpdate( 
            buyerId,
            { 
                $inc: { credits: ReferCreditEnum.REFERRED_CREDIT },
                isFirstPurchaseFromReferral: true
            },
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

        session.endSession();

        return {
            purchase
        };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Purchase Transaction failed", error);
        return { message: "Failed to credit users for first purchase" }
    }
}