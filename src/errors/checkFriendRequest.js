import FriendRequest from "../models/friendRequestsSchema.js";

export const checkFriendRequestSchema = {
  id: {
    in: ["params"],
    exists: {
      errorMessage: "Id is required",
    },
    custom: {
      options: async (value, { req }) => {
        const id = req.params.id;
        const request = await FriendRequest.findById(id);
        if (!request) return Promise.reject("Request does not exists");
        req.request = request;
      },
    },
  },
};
