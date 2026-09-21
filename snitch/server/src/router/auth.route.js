import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import {
  getMe,
  loginController,
  refresh,
  registerController,
} from "../controller/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = {email,name,password}
 * @response res.status = 201 (if successful)
 */

router.post("/register", registerValidator, registerController);

/**
 * @POST /api/auth/login
 * @param req Express req
 * @param req.body = {email,password}
 * @response res.status = 200 (if successful)
 */

router.post("/login", loginValidator, loginController);

/**
 * @POST /api/auth/refresh
 */

router.post("/refresh", refresh);

/**
 * @GET /api/me
 */

router.get("/me",authenticate,getMe);

export default router;
