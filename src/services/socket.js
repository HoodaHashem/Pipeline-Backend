import { Server } from "socket.io";
import "dotenv/config";
import User from "../models/user.js";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  const activeUsers = new Map();

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      activeUsers.set(userId, socket.id);
    }

    const fetchUserInfo = async () => {
      try {
        const user = await User.findById(userId);
        if (user) {
          socket.emit("userInfo", user);
        }
      } catch (error) {
        socket.emit("userInfoError", "Failed to fetch user information");
      }
    };

    fetchUserInfo();

    socket.on("disconnect", () => {
      if (userId && activeUsers.get(userId) === socket.id) {
        activeUsers.delete(userId);
      }
    });
  });
};

export default setupSocket;
