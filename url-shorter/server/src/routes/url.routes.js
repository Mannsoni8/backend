import express from "express";
import {
  getUrlShortcodeController,
  getUrl,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", getUrlShortcodeController);

router.get("/",getUrl);

export default router;
