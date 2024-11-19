import User from "../models/user.js";
import bcrypt from "bcrypt";

export const signInValidationSchema = {
  userIdentifier: {
    custom: {
      options: async (value, { req }) => {
        if (value.trim().length > 0) {
          const user = await User.findOne({
            $or: [{ email: value }, { username: value }, { phone: value }],
          });
          if (!user) {
            return Promise.reject("User does not exists");
          }
          req.user = user;
        } else {
          return Promise.reject("Identifier is required");
        }
      },
    },
  },
  signInPassword: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    custom: {
      options: async (value, { req }) => {
        const { userIdentifier } = req.body;
        const user = await User.findOne({
          $or: [
            { email: userIdentifier },
            { username: userIdentifier },
            { phone: userIdentifier },
          ],
        }).select("+password");

        if (user) {
          const isMatch = await bcrypt.compare(value, user.password);
          if (!isMatch) {
            return Promise.reject("Incorrect password");
          }
          req.user = user;
        }
      },
    },
  },
};
