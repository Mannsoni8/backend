import { Server } from "socket.io";

export default function initializedSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("A user is connected", socket.id);

    socket.on("disconnect", () => {
      console.log("A user is disconnected", socket.id);
    });

    socket.on("elon", () => {
      console.log("Elon event recived");
    });
  });
}
