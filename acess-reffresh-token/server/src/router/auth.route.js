import { Router } from "express";
import {
  getUserController,
  userRegisterController,
} from "../controller/auth.controller.js";
import { refreshTokenController } from "../controller/token.controller.js";

const router = Router();

router.post("/register", userRegisterController);
router.get("/me", getUserController);
router.post("/refresh",refreshTokenController)


export default router;
