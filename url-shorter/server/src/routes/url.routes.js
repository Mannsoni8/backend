import express from "express";
import { getUrlShortcodeController } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", getUrlShortcodeController);

export default router;
