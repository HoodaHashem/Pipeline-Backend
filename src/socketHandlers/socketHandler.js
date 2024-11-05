import FriendRequest from "../models/friendRequestsSchema.js";
import User from "../models/user.js";
import broadcastFriendRequestUpdate from "./broadcastFriendRequestUpdate.js";
import getFriendRequests from "./getFriendRequests.js";

const socketHandler = (io, socket, userId) => {
  socket.on("requestFriendRequests", () => {
    getFriendRequests(socket, userId);
  });

  socket.on("sendFriendRequest", async (toUserId) => {
    const sendBefore = await FriendRequest.findOne({
      from: userId,
      to: toUserId,
    });
    if (!sendBefore) {
      await FriendRequest.create({
        from: userId,
        to: toUserId,
      });
      await broadcastFriendRequestUpdate(io, [userId, toUserId]);
    }
  });

  socket.on("cancelFriendRequest", async (toUserId) => {
    const check = await FriendRequest.findOne({
      from: userId,
      to: toUserId,
    });

    if (check) {
      await check.deleteOne();
    }

    await broadcastFriendRequestUpdate(io, [userId, toUserId]);
  });

  socket.on("acceptFriendRequest", async (toUserId) => {
    const check = await FriendRequest.findOne({
      from: toUserId,
      to: userId,
    });

    if (check) {
      check.acceptance = "accepted";
      check.updatedAt = Date.now();
      const user = await User.findById(userId);
      const friend = await User.findById(toUserId);
      if (
        !user.friends.includes(toUserId) &&
        !friend.friends.includes(userId)
      ) {
        user.friends.push(toUserId);
        friend.friends.push(userId);
      }
      await user.save();
      await friend.save();
      await check.save();
    }

    await broadcastFriendRequestUpdate(io, [userId, toUserId]);
  });

  socket.on("rejectFriendRequest", async (toUserId) => {
    const check = await FriendRequest.findOne({
      from: toUserId,
      to: userId,
    });

    if (check) {
      check.acceptance = "rejected";
      check.updatedAt = Date.now();
      await check.save();
    }

    await broadcastFriendRequestUpdate(io, [userId, toUserId]);
  });
};

export default socketHandler;
