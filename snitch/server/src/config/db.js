import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect()
        console.log("Database is connected")
    } catch (error) {
        console.log("Error in connecting database",error)
    }
}