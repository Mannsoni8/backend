import express from "express";
import { registerUserController } from "../controllers/auth.controller.js";

const router = express.Router('/register',registerUserController);


export default router