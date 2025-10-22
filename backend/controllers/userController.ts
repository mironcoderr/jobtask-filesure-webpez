import { Request, Response, NextFunction } from "express";
import { getAllUsersService } from "../services/userService";

export const getAllUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            users
        });
    } 
    catch (error) {
        next(error);
    }
};

