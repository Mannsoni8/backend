import { Router } from "express";
import {
  getUserController,
  userRegisterController,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", userRegisterController);
router.get("/me", getUserController);
router.post("/refresh",refreshTokenController)


export default router;
