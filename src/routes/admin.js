import { request, Router } from "express";
import User from "../models/user.js";
import FriendRequest from "../models/friendRequestsSchema.js";

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

export default adminRouter;
