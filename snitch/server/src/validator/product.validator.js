import { body, validationResult } from "express-validator";

export const CreateProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must in betweein 2 to 100 character")
    .bail(),
  isAlpha("en-US", { ignore: " -" })
    .withMessage("Title can only be in English")
    .bail(),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description length must be between 20 to 500 characters")
    .bail(),
  body("price.amount")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Price amount must be a floating number and amount must be greater than 0",
    )
    .bail(),
  body("price.currency")
    .exists()
    .withMessage("Curreny is required")
    .isString()
    .withMessage("Currency must be a string")
    .isIn(["INR", "USD"])
    .withMessage("Currency either be INR or USD"),
  body("sizes")
    .exists()
    .isArray()
    .withMessage("Sizes must be an array of object"),
  body("sizes.*.size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString()
    .withMessage("Size must be a string")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Invalid size")
    .bail(),
  body("sizes.*.stock")
    .exists()
    .withMessage("stock must be present in every entry of the sizes of array")
    .bail()
    .isIn()
    .withMessage("Stock must be a integer value")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.array(),
      });
    }
    next();
  },
];
