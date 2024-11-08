import mongoClient from "../configs/mongoClient.js";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  isValid: {
    type: Boolean,
    default: false,
  },
  validationToken: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  validationTokenExpires: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["online", "typing", "offline"],
    default: "offline",
  },
});

userSchema.index({friends: 1})
const User = mongoClient.model("User", userSchema);

export default User;
