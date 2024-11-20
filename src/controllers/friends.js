import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import FriendRequest from "../models/friendRequestsSchema.js";

export const getAllFriendRequests = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }

  const user = req.user;
  const outgoingRequests = await FriendRequest.find({
    from: user._id,
  })
    .populate("from")
    .populate("to");
  const incomingRequests = await FriendRequest.find({
    to: user._id,
  })
    .populate("from")
    .populate("to");
  res.status(200).json({
    status: "success",
    outgoingRequests,
    incomingRequests,
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
    from: sender,
    to: receiver,
  });
  newRequest.save();
  return res.status(200).json({
    status: "success",
    message: "request has been sent",
  });
});

export const SearchForFriend = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }
  return res.status(200).json({
    status: "success",
    users: req.searchResult,
  });
};
