import { Router } from "express";
import { loginController } from "../controllers/authController";
import { logoutController } from "../controllers/authController";
import { registerController } from "../controllers/authController";

const router = Router();

router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/register", registerController);

export default router;
