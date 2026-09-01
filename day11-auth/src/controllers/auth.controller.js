import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const registerUserController = (req, res) => {
  const { email, name, password } = req.body;

  const token = jwt.sign({ email, name: _id }, process.env.JWT_SECRET);

  res.status(201).json({
    message: "user created sucessfult",
  });
};
