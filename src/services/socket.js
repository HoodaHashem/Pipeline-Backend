import { Server } from "socket.io";
import "dotenv/config";
import User from "../models/user.js";
import socketHandler from "../socketHandlers/socketHandler.js";
import getFriendRequests from "../socketHandlers/getFriendRequests.js";
import FriendRequest from "../models/friendRequestsSchema.js";
import broadcastFriendRequestUpdate from "../socketHandlers/broadcastFriendRequestUpdate.js";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  const activeUsers = new Map();

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      activeUsers.set(userId, socket.id);

      socket.join(userId.toString());

      socketHandler(io, socket, userId);
    }

    socket.on("disconnect", () => {
      if (userId && activeUsers.get(userId) === socket.id) {
        activeUsers.delete(userId);
      }
    });
  });
};

export default setupSocket;
