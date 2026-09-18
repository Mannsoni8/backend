import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter the valid email address"),
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be in string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name length must be min 2 and max 50"),
  body("password")
    .trim()
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be in String")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 char long"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];
