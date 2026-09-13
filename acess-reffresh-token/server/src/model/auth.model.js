import mongoose from "mongoose";

const userAuthShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [20, "Name cannot exceed 20 characters"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  paswword: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

const userModel = mongoose.model("user-auth", userAuthShema);
export default userModel;
