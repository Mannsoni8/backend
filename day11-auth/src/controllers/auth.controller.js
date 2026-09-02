import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const registerUserController = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check required fields
    if (!email || !name || !password) {
      return res.status(400).json({
        message: "Email, name and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Create user
    const user = await userModel.create({
      email,
      name,
      password,
    });

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "User created successfully",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.log("Registration error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
