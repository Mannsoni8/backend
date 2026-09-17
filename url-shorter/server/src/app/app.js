import express from "express";
import router from "../routes/url.routes.js";
import { codeUrlController } from "../controllers/url.controller.js";

const app = express();
app.use(express.json());

app.use("/api/url", router);

app.get("/:code", codeUrlController);

export default app;
