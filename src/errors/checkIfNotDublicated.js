import User from "../models/user.js";
import {
  FULL_NAME_MIN_CHARS,
  PASSWORD_MIN_CHARS,
  USERNAME_MIN_CHARS,
} from "../constants/index.js";

const checkIfNotDublicated = {
  fullName: {
    optional: true,
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
    optional: true,
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
      },
    },
  },
  password: {
    optional: true,
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
    optional: true,
    notEmpty: {
      errorMessage: "Username is required",
    },
    isLength: {
      optional: true,
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
      },
    },
  },
  phone: {
    optional: true,
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

export default checkIfNotDublicated;
