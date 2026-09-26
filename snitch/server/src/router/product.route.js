import { Router } from "express";
import {
  authenticate,
  authenticateSeller,
} from "../middleware/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
} from "../controller/product.controller.js";
import multer from "multer";
import { CreateProductValidator } from "../validator/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, //1MB
  },
});

const productRouter = Router();

/**
 * @method POST
 * @route /qpi/products/
 * @description creates the product and save its data into the DB,images will be store in imageKit.
 * req.body=>{title,description:price:{amount,currency},size:[{size,stock}]
 */

productRouter.post(
  "/",
  authenticate,
  authenticateSeller,
  upload.array("images"),
  (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.size = JSON.parse(req.body.size);
    next();
  },
  CreateProductValidator,
  createProduct,
);

/**
 * @method GET
 * @route /api/product
 * @description Read all the products from the DB
 * @access user
 */
productRouter.get("/", authenticate, listAllProducts);

/**
 * @method PATCH
 * @route /api/product/unlist/:id
 * @description Unlist a product by id
 * @access seller
 */

productRouter.patch("/unlist/:id", authenticate, authenticateSeller);

export default productRouter;
