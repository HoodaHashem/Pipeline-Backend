import mongoose from "mongoose";
import mongoClient from "../configs/mongoClient";

const chatSchema = mongoose.Schema({
  participants: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  lstMsg: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Message",
  },
  updatedAt: { type: Date, default: Date.now },
});

const Chat = mongoClient("Chat", chatSchema);

export default Chat;
