import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import Chat from "../models/chatSchema.js";
import Message from "../models/msgSchema.js";

export const getChatInfo = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }

  const { chatId } = req.params;

  const chat = await Chat.findById(chatId).populate({
    path: "participants",
    select: "fullName username phone photo email",
  });

  const messages = await Message.find({
    chatId,
    deletedFor: { $ne: req.user.id },
  })
    .sort({ createdAt: 1 })
    .select("-deletedFor");

  return res.status(200).json({
    status: "success",
    chat,
    messages,
  });
});
