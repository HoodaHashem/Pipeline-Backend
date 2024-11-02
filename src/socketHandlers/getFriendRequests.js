import mongoose from "mongoose";
import FriendRequest from "../models/friendRequestsSchema.js";

const getFriendRequests = async (socket, userId) => {
  if (mongoose.Types.ObjectId.isValid(userId)) {
    const outgoingRequests = await FriendRequest.find({
      from: userId,
    })
      .populate("from")
      .populate("to");
    const incomingRequests = await FriendRequest.find({
      to: userId,
    })
      .populate("from")
      .populate("to");

    socket.emit("getFriendRequests", { outgoingRequests, incomingRequests });
  }
};

export default getFriendRequests;
