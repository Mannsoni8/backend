import { Router } from "express";
import { registerUserController } from "../controllers/auth.controller.js";

const route = Router();

/**
 * @Post api/auth/register
 * req.body = {email,phone,password}
 */

route.post("/rigister",registerUserController)

export default route;
