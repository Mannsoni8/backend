import { Router } from "express";
import { addToCardValidator } from "../validator/cart.validation.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { addToCartController } from "../controller/cart.controller.js";


const cartRouter = Router();

/**
 * @method POST
 * @route /api/cart
 * @access protected
 * @description Add an product to the user's cart
 */
// req.body = {productId,quantity,size}

cartRouter.post("/",authenticate,addToCardValidator,addToCartController);


cartRouter.get("/get-cart")

export default cartRouter;
