import { Router } from "express";
import {
  getUserController,
  userRegisterController,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", userRegisterController);
router.get("/me", getUserController);

export default router;
