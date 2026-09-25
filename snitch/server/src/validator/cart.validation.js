import { body, validationResult } from "express-validator";

export const addToCardValidator = [
  body("productId")
    .exists()
    .withMessage("Product ID is required")
    .bail()
    .isString()
    .withMessage("Product ID must be a string")
    .bail()
    .isMongoId()
    .withMessage("Invalid product ID"),

  body("quantity")
    .exists()
    .withMessage("Quantity is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString()
    .withMessage("Size must be a string")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Invalid size"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }

    next();
  },
];
