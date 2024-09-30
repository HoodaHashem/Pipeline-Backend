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
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
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
});

const User = mongoClient.model("User", userSchema);

export default User;
