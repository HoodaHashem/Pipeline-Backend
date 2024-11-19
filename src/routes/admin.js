import { Router } from "express";
import User from "../models/user.js";
import FriendRequest from "../models/friendRequestsSchema.js";
import Chat from "../models/chatSchema.js";
import Message from "../models/msgSchema.js";

const adminRouter = Router();

adminRouter.get("/users", async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: await User.find(),
    },
  });
});

adminRouter.delete("/users", async (req, res) => {
  await User.deleteMany().then(() => {
    res.status(200).json({
      status: "success",
      message: "All users deleted successfully",
    });
  });
});

adminRouter.delete("/requests", async (req, res) => {
  await FriendRequest.deleteMany().then(() => {
    res.status(200).json({
      status: "success",
      message: "All request deleted successfully",
    });
  });
});

adminRouter.get("/requests", async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      requests: await FriendRequest.find(),
    },
  });
});

adminRouter.get("/chats", async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      chats: await Chat.find(),
    },
  });
});

adminRouter.delete("/chats", async (req, res) => {
  await Chat.deleteMany().then(() => {
    res.status(200).json({
      status: "success",
    });
  });
});

adminRouter.get("/msgs", async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      messages: await Message.find(),
    },
  });
});

adminRouter.delete("/msgs", async (req, res) => {
  await Message.deleteMany().then(() => {
    res.status(200).json({
      status: "success",
    });
  });
});

export default adminRouter;
