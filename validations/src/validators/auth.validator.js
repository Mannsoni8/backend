import { body, validationResult } from "express-validator";
export const registerValidators =  [
    body("emal")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email Address"),
    body("phone")
      .exists()
      .withMessage("Phone Number is required")
      .isMobilePhone("en-IN")
      .withMessage("Invalid Phone Number"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long"),

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
  ]