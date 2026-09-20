import mongoose from "mongoose"
import config from "./config.js"

async function ConnecteDB() {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Server is connected to DB")
    } catch (error) {
        console.log("Error in connecting DB",error)
    }
}

export default ConnecteDB