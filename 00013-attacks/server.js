import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  message: { message: "To many login attempts. Try again in 1 min" },
});

app.get("/api/login", loginLimiter, (req, res) => {
  res.send("Login endpoints");
});

app.listen(3000, () => {
  console.log("Server is running");
});
