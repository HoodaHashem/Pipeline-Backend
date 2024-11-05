import User from "../models/user.js";

const checkSearch = {
  search: {
    notEmpty: {
      errorMessage: "Search field is required",
    },
    custom: {
      options: async (value, { req }) => {
        const emailRegex = new RegExp(`^${value}[^@]*$`, "i");
        const searchRegex = new RegExp(value, "i");

        let users = await User.aggregate([
          {
            $match: {
              $and: [
                { _id: { $ne: req.user._id } },
                {
                  $or: [
                    { username: searchRegex },
                    { email: emailRegex },
                    { phone: searchRegex },
                  ],
                },
              ],
            },
          },
          {
            $addFields: {
              isFriend: {
                $in: [req.user._id, "$friends"],
              },
            },
          },
        ]);

        if (!users.length) {
          users = await User.aggregate([
            {
              $match: {
                $and: [
                  { _id: { $ne: req.user._id } },
                  { fullName: searchRegex },
                ],
              },
            },
            {
              $addFields: {
                isFriend: {
                  $in: [req.user._id, "$friends"],
                },
              },
            },
          ]);
        }

        if (!users.length) {
          throw new Error("Not Found");
        }

        req.searchResult = users;
      },
    },
  },
};
export default checkSearch;
