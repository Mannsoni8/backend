import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
    //select: false
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
