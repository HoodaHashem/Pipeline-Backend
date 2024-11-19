import Chat from "../models/chatSchema.js";

const chatsHandlers = (io, socket, userId) => {
  socket.on(
    "createNewChat",
    async ({ chatType, participants, name, admins }) => {
      participants.push(userId);

      if (chatType === "direct") {
        const exists = await Chat.findOne({
          type: chatType,
          participants: { $all: participants },
        })
          .populate({
            path: "participants",
            select: "username fullName photo status lastSeen",
            match: { _id: { $ne: userId } },
          })
          .populate("lastMessage")
          .sort({ updatedAt: -1 });

        if (exists) {
          socket.emit("getChats", exists);
          return;
        }

        const newChat = new Chat({
          type: chatType,
          participants,
        });

        await newChat.save();

        const savedChat = await Chat.findById(newChat._id)
          .populate({
            path: "participants",
            select: "username fullName photo status lastSeen",
            match: { _id: { $ne: userId } },
          })
          .populate("lastMessage");

        socket.emit("getChats", savedChat);
        return;
      }

      if (chatType === "group") {
        // TODO: Handle group chat creation here
      }
    },
  );
};

export default chatsHandlers;
