import { Request, Response, NextFunction } from "express";
import { getRegisteredUsersService, getSingleUserService, getReferredUsersService } from "../services/userService";

export const getRegisteredUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await getRegisteredUsersService();

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

export const getSingleUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User!"
            });
        }

        const user = await getSingleUserService(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            user
        });
    } 
    catch (error) {
        next(error);
    }
};

export const getReferredUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!"
            });
        }

        const referrals = await getReferredUsersService(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Referred users fetched successfully!",
            referrals
        });
    } 
    catch (error) {
        next(error);
    }
};


