import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/access-refresh-token",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || process.env.REFRESS_TOKEN_SECRET || "default_refresh_secret",
};

export default config;