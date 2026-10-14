import app from "./app/app.js"
import {createServer} from "http"
import initializedSocket from "./sockets/socket.server.js"

const httpServer = createServer(app)
initializedSocket(httpServer)

httpServer.listen(3000,()=>{
    console.log("Server is running")
})