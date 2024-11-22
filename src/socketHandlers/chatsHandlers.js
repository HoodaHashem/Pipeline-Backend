import Chat from "../models/chatSchema.js";
import Message from "../models/msgSchema.js";

const chatsHandlers = (io, socket, userId) => {
  socket.on(
    "createNewChat",
    async ({ chatType, participants, name, admins }) => {
      participants.push(userId);

      if (chatType === "direct") {
        const chat = await Chat.findOne({
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

        if (chat) {
          const messages = await Message.find({
            chatId: chat.id,
            deletedFor: { $ne: userId },
          })
            .sort({ createdAt: 1 })
            .select("-deletedFor");
          socket.emit("getChats", { chat, messages });
          return;
        }

        const newChat = new Chat({
          type: chatType,
          participants,
        });

        await newChat.save();

        const savedChat = await Chat.findById(newChat._id).populate({
          path: "participants",
          select: "username fullName photo status lastSeen",
          match: { _id: { $ne: userId } },
        });

        socket.emit("getChats", savedChat);
        return;
      }

      if (chatType === "group") {
        // TODO: Handle group chat creation here
      }
    },

    socket.on("getChatInfo", async ({ chatId, userId }) => {
      const chat = await Chat.findById(chatId).populate({
        path: "participants",
        select: "fullName username phone photo email",
      });

      const messages = await Message.find({
        chatId,
        deletedFor: { $ne: userId },
      })
        .sort({ createdAt: 1 })
        .select("-deletedFor");

      io.to(userId).emit("chatInfo:receive", { chat, messages });
    }),
  );
};

export default chatsHandlers;
