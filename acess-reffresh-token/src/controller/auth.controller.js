import userModel from "../model/auth.model.js";

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Create user
    const user = await userModel.create({
      name,
      email,
      password
    });

    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};