import { Request, Response, NextFunction } from "express";
import { purchaseService } from "../services/purchaseService";

export const purchaseController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buyer = (req as any).user;
        
        if (!buyer || !buyer.id) return res.status(401).json({ 
            success: false, 
            message: "Unauthorized User!" 
        });

        const result = await purchaseService(buyer.id);

        return res.status(201).json({
            success: true,
            credited: result.credited,
            message: result.message,
            data: result.purchase
        });
    } 
    catch (error) {
        next(error);
    }
};
