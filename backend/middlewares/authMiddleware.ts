import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const token =
            req.headers.authorization?.split(" ")[1] ||
            req.cookies?.token;
        
        if (!token) {
            return res.status(401).json({ 
                message: "Unauthorized User!" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        req.user = decoded as { id: string; role: string };

        next();
    } 
    catch (err) {
        return res.status(401).json({ 
            message: "Unauthorized User!" 
        });
    }
};
