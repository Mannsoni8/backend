import express from "express";
import route from "../routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", route);

export default app;
