import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    function publicRooms() {
      const {
        sockets: {
          adapter: { sids, rooms }
        }
      } = io;
      const publicRooms = [];
      rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
          publicRooms.push(key);
        }
      });
      return publicRooms;
    }

    function countRoom(roomName) {
      return io.sockets.adapter.rooms.get(roomName)?.size;
    }

    io.on("connection", socket => {
      socket["nickname"] = "Anon";
      socket.onAny(event => {
        console.log(`Socket Event: ${event}`);
      });
      socket.on("enter_room", roomName => {
        socket.join(roomName);
        socket
          .to(roomName)
          .emit("welcome", roomName, socket.nickname, countRoom(roomName));
        io.sockets.emit("room_change", publicRooms());
      });
      socket.on("disconnecting", () => {
        socket.rooms.forEach(room =>
          socket
            .to(room)
            .emit("bye", room, socket.nickname, countRoom(room) - 1)
        );
      });
      socket.on("disconnect", () => {
        io.sockets.emit("room_change", publicRooms());
      });
      socket.on("new_message", (msg, room) => {
        io.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
      });
      socket.on("nickname", nickname => (socket["nickname"] = nickname));
    });
  }
  res.end();
};

export default SocketHandler;
