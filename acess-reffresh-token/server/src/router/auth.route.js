import { Router } from "express";
import {
  getUserController,
  userLoginController,
  userLogoutController,
  userRegisterController,
} from "../controller/auth.controller.js";
import { refreshTokenController } from "../controller/token.controller.js";

const router = Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.post("/logout", userLogoutController);
router.get("/me", getUserController);
router.post("/refresh", refreshTokenController);

export default router;
