import {
  FULL_NAME_MIN_CHARS,
  PASSWORD_MIN_CHARS,
  USERNAME_MIN_CHARS,
} from "../constants/index.js";
import User from "../models/user.js";

export const signUpValidationSchema = {
  fullName: {
    trim: true,
    notEmpty: {
      errorMessage: "full name is required",
    },
    matches: {
      options: /\s/,
      errorMessage: "Enter first and last name",
    },
    isLength: {
      options: {
        min: FULL_NAME_MIN_CHARS,
      },
      errorMessage: `At least ${FULL_NAME_MIN_CHARS} characters`,
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Invalid Email",
    },
    custom: {
      options: async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already exists");
        }
        return true;
      },
    },
  },
  password: {
    isLength: {
      options: {
        min: PASSWORD_MIN_CHARS,
      },
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "Username is required",
    },
    isLength: {
      options: {
        min: USERNAME_MIN_CHARS,
      },
      errorMessage: `At least ${USERNAME_MIN_CHARS}`,
    },
    isLowercase: {
      errorMessage: "Must be lower case",
    },
    isAlphanumeric: {
      errorMessage: "Must be letters and numbers only",
    },
    custom: {
      options: async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
          return Promise.reject("Username already exists");
        }
        return true;
      },
    },
  },
  phone: {
    notEmpty: {
      errorMessage: "phone is required",
    },
    custom: {
      options: async (value) => {
        if (
          !/^(\+?\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
        ) {
          return Promise.reject("Invalid phone number");
        }
        const user = await User.findOne({ phone: value });
        if (user) return Promise.reject("Phone numer already exists");
      },
    },
  },
};
