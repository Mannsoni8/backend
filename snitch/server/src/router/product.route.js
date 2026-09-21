import { Router } from "express";

const productRouter = Router()

/**
 * @method POST
 * @route /qpi/products/
 * @description creates the product and save its data into the DB,images will be store in imageKit.
 * req.body=>{title,description:price:{amount,currency},size:[()]
 */


export default productRouter