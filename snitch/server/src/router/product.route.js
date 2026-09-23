import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createProduct } from "../controller/product.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const productRouter = Router();

/**
 * @method POST
 * @route /qpi/products/
 * @description creates the product and save its data into the DB,images will be store in imageKit.
 * req.body=>{title,description:price:{amount,currency},size:[{size,stock}]
 */

Router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role != "seller") {
      return res.status(403).json({
        message: "user is not authorize to create products",
      });
    }
    next();
  },
  upload.array("images"),
  (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.size = JSON.parse(req.body.size);
    next();
  },
  createProduct,
);

export default productRouter;
