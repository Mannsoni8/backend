import { Router } from "express";
import {
  getUserController,
  userRegisterController,
} from "../controller/auth.controller";
import { refreshTokenController } from "../controller/token.controller";

const router = Router();

router.post("/register", userRegisterController);
router.get("/me", getUserController);
router.post("/refresh",refreshTokenController)


export default router;
