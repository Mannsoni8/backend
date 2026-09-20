import { Router } from "express";
import { registerUserController } from "../controllers/auth.controller.js";
import { registerValidators } from "../validators/auth.validator.js";

const route = Router();

/**
 * @Post api/auth/register
 * req.body = {email,phone,password}
 */

route.post("/rigister", registerValidators, registerUserController);

export default route;
