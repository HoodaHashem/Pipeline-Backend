import mongoose from "mongoose";
import mongoClient from "../configs/mongoClient";

const msgSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Chat",
  },
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
});

const Message = mongoClient.model("Message", msgSchema);

export default Message;
