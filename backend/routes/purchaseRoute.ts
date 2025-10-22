import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { purchaseController } from "../controllers/purchaseController";

const router = Router();

router.post("/", authMiddleware, purchaseController);

export default router;
