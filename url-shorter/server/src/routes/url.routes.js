import express from "express";
import {
  getUrlShortcodeController,
  getUrl,
  deleteUrlController,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", getUrlShortcodeController);

router.get("/",getUrl);

router.delete("/delete", deleteUrlController)

export default router;
