import { Server } from "socket.io";

export default function initializedSocket(httpServer) {
  const io = new Server(httpServer);
}
