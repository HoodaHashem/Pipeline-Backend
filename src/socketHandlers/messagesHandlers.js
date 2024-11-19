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
      io.to(receiverId).emit("message:receive", content);
      io.to(userId).emit("message:receive", content);
    } catch {
      console.error("error sending the message");
    }
  });
};

export default messagesHandlers;
