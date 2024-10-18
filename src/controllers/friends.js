import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import FriendRequest from "../models/friendRequestsSchema.js";

export const getAllFriendRequests = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const requests = await FriendRequest.find({
    from: user._id,
  });
  res.status(200).json({
    status: "success",
    requests,
  });
});

export const sendFriendRequest = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }
  const sender = req.user;
  const receiver = req.receiver;
  const newRequest = new FriendRequest({
    from: sender._id,
    to: receiver._id,
  });
  newRequest.save();
  return res.status(200).json({
    status: "success",
    message: "request has been sent",
  });
});
