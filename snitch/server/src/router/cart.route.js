import { Router } from "express";

const cartRouter = Router();

/**
 * @method POST
 * @route /api/cart
 * @access protected
 * @description Add an product to the user's cart
 */
// req.body = {productId,quantity,size}

cartRouter.post("/");

export default cartRouter;
