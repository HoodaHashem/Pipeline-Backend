import User from "../models/user.js";

export const sendFriendRequestSchema = {
  id: {
    in: ["params"],
    exists: {
      errorMessage: "Id is required",
    },
    custom: {
      options: async (value, { req }) => {
        const receiver = await User.findOne({
          $or: [{ email: value }, { username: value }, { phone: value }],
        });

        if (!receiver) {
          return Promise.reject("User Does not exists");
        }
        if (receiver.id === req.user.id) {
          return  Promise.reject("You cannot send a friend request to yourself");
        }
        req.receiver = receiver;
      },
    },
  },
};
