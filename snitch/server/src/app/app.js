import express from "express";
import router from "../router/auth.route.js";
import cookieParser from "cookie-parser";
import cartRouter from "../router/cart.route.js";
import productRouter from "../router/product.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);
application.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

export default app;
