import { loginSchema } from "../schemas/loginSchema";
import { registerSchema } from "../schemas/registerSchema";
import { Request, Response, NextFunction } from "express";
import { loginService, registerService } from "../services/authService";

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const user = await registerService(validatedData);

        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user
        });
    } 
    catch (error) {
        next(error);
    }
};

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const { user, token } = await loginService(validatedData);

        return res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            token,
            user
        })
    }
    catch (error) {
        next(error);
    }
}

export const logoutController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}

