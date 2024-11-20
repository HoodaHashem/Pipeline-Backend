import Chat from "../models/chatSchema.js";

export const checkGetChatInfo = {
  chatId: {
    in: ["params"],
    exists: {
      errorMessage: "Id is required",
    },
    custom: {
      options: async (value, { req }) => {
        const id = req.params.chatId;
        const request = await Chat.findById(id);
        if (!request) return Promise.reject("chat id does not exists");
        req.request = request;
      },
    },
  },
};
