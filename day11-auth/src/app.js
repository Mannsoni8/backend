import express from "express"
import router from "./routes/user.route.js"
import connectDB from "./config/db.js"


const app = express()
app.use(express.json())
connectDB()

app.get('/api',(req,res)=>{
    res.status(200).json({
        message:"All good"
    })
})


app.use('/api',router)

export default app