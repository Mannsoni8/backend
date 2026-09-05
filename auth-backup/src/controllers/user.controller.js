import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All the register field is required",
    });
  }

  const isExist = await userModel.findOne({ email });

  if (isExist) {
    return res.status(400).json({
      message: "User already register",
    });
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPass,
  });

  const token = jwt.sign({ user: user._id }, config.JWT_SECRET);

  return res.status(201).json({
    message: "User is register",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All the login field is required",
    });
  }

  const isExist = await userModel.findOne({ email });

  if (!isExist) {
    return res.status(400).json({
      message: "User is not register",
    });
  }

  const comparePass = await bcrypt.compare(password, user.password);

  if (!comparePass) {
    return res.status(400).json({
      message: "Wrong pass",
    });
  }

  const hashPass = await bcrypt.hash(password, 10);

  const token = jwt.sign({ user: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    message: "Login successful",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
    hashPass,
  });
};
