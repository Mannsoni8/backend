import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  //skipSuccessfulRequests:true,// login successfully ho rha h to skip nahi hoga not count as limit
  message: { message: "To many login attempts. Try again in 1 min" },
});

app.get("/api/login", loginLimiter, (req, res) => {
  res.send("Login endpoints");
});

app.listen(3000, () => {
  console.log("Server is running");
});

/**
 * min length 8
 * must contain at least one uppercase
 * must contain at least one lowercase
 * must contain at least one number
 * must contain at least one special character
 */
