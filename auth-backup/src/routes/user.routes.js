import { Router } from "express";
import { registerUserController } from "../controllers/user.controller.js";

const routes = Router()

routes.post("/register",registerUserController)

export default routes