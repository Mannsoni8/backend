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

export const loginUserController = async (req, res) => {
  // is more appropriate for a protected route, not for the initial login.
  // const authHeader = req.headers.authorization

  // console.log(authHeader)

  // const data = jwt.decode(authHeader)
  // console.log(data)

  // const user = await userModel.findById(data.id)

  // console.log(user)

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};
