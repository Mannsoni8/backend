import express from "express";
import { getUrlShortcodeController } from "../controllers/url.controller.js";

const router = express.Router();

router.get("/", getUrlShortcodeController);

export default router;
