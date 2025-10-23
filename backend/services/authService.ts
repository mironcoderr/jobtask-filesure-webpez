import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { Refer } from "../models/referModel";
import { UserRoleEnum } from "../enums/userRoleEnum";
import { ReferStatusEnum } from "../enums/referStatusEnum";
import { RegisterType } from "../schemas/registerSchema";
import { LoginType } from "../schemas/loginSchema";


export const registerService = async ({ name, email, password, referralCode }: RegisterType) => {

    // DUPLICATE USER CHECKING BY EMAIL
    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error("Email already registered!");

    // CREATED HASHED PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // FIND AND DEFINED USER ROLE
    const roleEnum = email === process.env.ADMIN_EMAIL ? UserRoleEnum.ADMIN : UserRoleEnum.CLIENT;

    // DEFINED REFERRER ID
    let referredBy: mongoose.Types.ObjectId | null = null;

    if (referralCode) {
        // FIND REFERRER USER
        const referrerUser = await User.findOne({ referralCode });

        if (!referrerUser) {
            // NOT FOUND REFERRER USER
            throw new Error("Invalid referral code!");
        }
        
        // SET REFERRER ID
        referredBy = referrerUser._id as mongoose.Types.ObjectId;
    }

    const newUser = await User.create({ 
        name, 
        email, 
        password: hashedPassword, 
        role: roleEnum,
        referredBy
    });

    if(referredBy) {
        await Refer.create({
            referrerId: referredBy,
            referredId: newUser._id,
            status: ReferStatusEnum.PENDING
        })
    }

    return {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        referralCode: newUser.referralCode,
        referredBy: newUser.referredBy,
        credits: newUser.credits
    };
};

export const loginService = async ({ email, password }: LoginType) => {

    // USER FOUND BASED ON EMAIL
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email cannot be found!");

    // PASSWORD MATCHING
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) throw new Error("Password could not be matched!");

    // CREATE JWT TOKEN
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );

    return {
        token,
        user
    }
}