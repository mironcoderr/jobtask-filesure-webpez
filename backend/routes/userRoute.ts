import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getSingleUserController } from "../controllers/userController";
import { getReferredUsersController } from "../controllers/userController";
import { getRegisteredUsersController } from "../controllers/userController";

const router = Router();

router.get("/registered", authMiddleware, getRegisteredUsersController);
router.get("/referred", authMiddleware, getReferredUsersController);
router.get("/me", authMiddleware, getSingleUserController);

export default router;
