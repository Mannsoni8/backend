import { Server, Socket } from "socket.io";

export default function initializedSocket(httpServer) {
  const io = new Server(httpServer);
  
  io.on("connection",(socket)=>{
    console.log("A user is connected",socket)
  })
  
}
