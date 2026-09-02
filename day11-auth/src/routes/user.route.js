import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", authenticate, loginUserController);

export default router;
