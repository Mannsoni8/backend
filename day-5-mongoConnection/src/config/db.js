const mongoose = require("mongoose");
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mann:cohort123@cohort-cluster.twix10r.mongodb.net/",
    );
    console.log("mongo connected");
  } catch (error) {
    console.log("error to connect db", error);
  }
};

module.exports = connectDb;
