export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: number;
    credits: number;
    referredBy: string | null;
    referralCode: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
