import express from "express";
import rateLimiit from "express-rate-limit";

const app = express();

const loginLimitter = rateLimiit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { message: "To many request attempts. Try again in 1 min" },
});

app.get("/api/login",loginLimitter,(req,res)=>{
    res.send("Login endpoints")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
