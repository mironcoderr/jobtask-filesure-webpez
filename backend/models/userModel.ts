import mongoose, { Schema, Document } from "mongoose";
import { UserRoleEnum } from "../enums/userRoleEnum";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

export interface UserType extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRoleEnum;
    referralCode: string,
    credits: number,
    referredBy?: mongoose.Types.ObjectId | null;
}

const userSchema = new Schema<UserType>({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: Number, 
        enum: [UserRoleEnum.ADMIN, UserRoleEnum.CLIENT],
        default: UserRoleEnum.CLIENT
    },
    referralCode: { 
        type: String, 
        unique: true, 
        default: () => nanoid() 
    },
    credits: { 
        type: Number, 
        default: 0 
    },
    referredBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        default: null 
    },
}, { timestamps: true });

export const User = mongoose.model<UserType>("User", userSchema);

