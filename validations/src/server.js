import app from "./app/app.js"
import ConnecteDB from "./config/db.js"

await ConnecteDB()
app.listen(3000,()=>{
    console.log("Server is running")
})