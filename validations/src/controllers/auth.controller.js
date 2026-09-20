import userModel from "../models/auth.model.js";

export async function registerUserController(req, res) {
  const { email, phone, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex) {
    errors.push({
      field: "emial",
      message: "Invalid Email Address",
    });
  }

  if (!phone) {
    errors.push({
      field: "phone",
      message: "Phone number is required",
    });
  }

  const phoneRegex = /^(?:(?:\+|00)91[\-\s]?|0)?[6-9]\d{9}$/;

  if (!phoneRegex) {
    errors.push({
      field: "phone",
      message: "Invalid Phone Number",
    });
  }

  if (!password && !password.trim()) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  }

  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  if (password.trim().length < 6) {
    errors.push({
      filed: "password",
      message: "Password field must contain minimum 6 charcater",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Invalid request",
      errors,
    });
  }

  const user = await userModel.create({
    email,
    phone,
    password: password,
  });

  res.status(201).json({
    message: "User register successfully",
    data: {
      email,
      phone,
      id: user._id,
    },
  });
}
