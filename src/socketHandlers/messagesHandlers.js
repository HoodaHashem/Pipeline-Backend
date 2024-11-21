import Chat from "../models/chatSchema.js";
import Message from "../models/msgSchema.js";

const messagesHandlers = (io, socket, userId) => {
  socket.on("message:send", async ({ chatId, content, receiverId }) => {
    try {
      const newMsg = new Message({
        chatId: chatId,
        content,
        sender: userId,
      });

      await newMsg.save();
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { lastMessage: newMsg._id },
        { new: true },
      )
        .populate({
          path: "lastMessage",
          select: "content",
        })
        .lean();
      io.to(receiverId).emit("message:receive", newMsg);
      io.to(userId).emit("message:receive", newMsg);
      io.to(receiverId).emit("contacts:update", updatedChat);
      io.to(userId).emit("contacts:update", updatedChat);
    } catch {
      console.error("error sending the message");
    }
  });
};

export default messagesHandlers;
