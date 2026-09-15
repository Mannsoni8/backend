import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../router/auth.route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

export default app;
