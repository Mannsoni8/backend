const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected bd");
  } catch (error) {
    console.log("error in connection DB", error);
  }
};

module.exports = connectDb;
