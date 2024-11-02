import mongoose from "mongoose";
import FriendRequest from "../models/friendRequestsSchema.js";

const broadcastFriendRequestUpdate = async (io, userIds) => {
  for (const userId of userIds) {
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

      io.to(userId.toString()).emit("getFriendRequests", {
        outgoingRequests,
        incomingRequests,
      });
    }
  }
};

export default broadcastFriendRequestUpdate;
