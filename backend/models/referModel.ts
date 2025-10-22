import mongoose, { Schema, Document } from "mongoose";
import { ReferStatusEnum } from "../enums/referStatusEnum";

export interface ReferType extends Document {
    referrerId: mongoose.Types.ObjectId;
    referredId: mongoose.Types.ObjectId;
    status: ReferStatusEnum;
    convertedAt?: Date | null;
}

const referSchema = new Schema<ReferType>({
    referrerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    referredId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    status: { 
        type: Number, 
        enum: [ReferStatusEnum.PENDING, ReferStatusEnum.CONVERTED], 
        default: ReferStatusEnum.PENDING 
    },
    convertedAt: { 
        type: Date, 
        default: null 
    },
}, { timestamps: true });

export const Refer = mongoose.model<ReferType>("Refer", referSchema);
