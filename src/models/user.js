import mongoose from "mongoose";
import mongoClient from "../configs/mongoClient.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 8 characters"],
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\+?[\d\s-]{10,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    isValid: {
      type: Boolean,
      default: false,
    },
    validationToken: String,
    validationTokenExpires: Date,
    status: {
      type: String,
      enum: ["online", "typing", "offline", "developing"],
      default: "developing",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual populate for chats
userSchema.virtual("chats", {
  ref: "Chat",
  localField: "_id",
  foreignField: "participants",
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ friends: 1 });
userSchema.index({ status: 1 });

const User = mongoClient.model("User", userSchema);

export default User;
