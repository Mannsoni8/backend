import express from "express";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { registerController } from "../controller/auth.controller.js";

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

router.post("/login",loginValidator);

/**
 * @POST /api/auth/refresh
 */

router.post("/refresh")

export default router;
