import User from "../models/user.js";
import bcrypt from "bcrypt";

export const signInValidationSchema = {
  userIdentifier: {
    notEmpty: {
      errorMessage: "Identifier is required",
    },
    custom: {
      options: async (value, { req }) => {
        const user = await User.findOne({
          $or: [{ email: value }, { username: value }, { phone: value }],
        });
        if (!user) {
          return Promise.reject("User does not exists");
        }
        req.user = user;
      },
    },
  },
  signInPassword: {
    notEmpty: {
      errorMessage: "Password is required",
    },
    custom: {
      options: async (value, { req }) => {
        if (!req.user) {
          return Promise.reject("User not found");
        }
        const isMatch = await bcrypt.compare(value, req.user.password);
        if (!isMatch) {
          return Promise.reject("Incorrect password");
        }
      },
    },
  },
};
