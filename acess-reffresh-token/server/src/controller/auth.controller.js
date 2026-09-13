import userModel from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyAcessToken } from "../utils/auth.js";

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateToken({
      userId: user._id,
    });

    user.refreshToken = refreshToken;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserController = async (req, res) => {
  const accessToekn = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = verifyAcessToken(accessToken);

    const user = await userModel.findById(decoded.id);

    return res.status(200).json({
      message: "User is fetch",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: `Invalid or expired access token ${error}`,
    });
  }
};
