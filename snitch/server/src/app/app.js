import express from "express";
import router from "../router/auth.route.js";
import cookie from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookie());

app.use("/api/auth", router);

export default app;
