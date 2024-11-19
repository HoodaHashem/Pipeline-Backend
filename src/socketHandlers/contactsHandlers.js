import mongoose from "mongoose";
import User from "../models/user.js";
import Chat from "../models/chatSchema.js";
import Message from "../models/msgSchema.js";

const contactsHandlers = (io, socket, userId) => {
  socket.on("getAcceptedFriends", async () => {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const userInfo = await User.findById(userId).populate({
        path: "friends",
        select: "fullName username email photo phone",
      });
      const friends = userInfo.friends;

      socket.emit("sendFriends", friends);
    }
  });

  socket.on("getContacts", async () => {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        socket.emit("contactsError", "Invalid user ID");
        return;
      }

      const chats = await Chat.find({ participants: userId })
        .populate({
          path: "participants",
          select: "_id username fullName photo status lastSeen",
          match: { _id: { $ne: userId } },
        })
        .populate("lastMessage")
        .sort({ updatedAt: -1 });

      socket.emit("contactsUpdate", chats);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      socket.emit("contactsError", "Failed to fetch contacts");
    }
  });
};

export default contactsHandlers;
