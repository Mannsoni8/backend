import dotenv from "dotenv"
dotenv.config

export const config = {
    MONGO_URI:process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET
}