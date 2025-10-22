import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    emailAddress: z.string().email("Invalid email address"),
    createPassword: z.string().min(6, "Password must be at least 6 characters"),
    repeatPassword: z.string().min(6, "Repeat password is required"),
}).refine((data) => data.createPassword === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
});
