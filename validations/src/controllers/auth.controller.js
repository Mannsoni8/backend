import userModel from "../models/auth.model.js";

export async function registerUserController(req, res) {
  const { email, phone, password } = req.body;

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
