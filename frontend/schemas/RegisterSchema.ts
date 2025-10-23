import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Full name field is required."),
    email: z.string().email("Valid email address is required."),
    password: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string().min(6, "Repeat password is required"),
    referralCode: z.string().optional(),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
});

export type RegisterType = z.infer<typeof registerSchema>;