import mongoose from "mongoose";
import config from "./config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(`Error in connecting DB ${error}`);
  }
};
