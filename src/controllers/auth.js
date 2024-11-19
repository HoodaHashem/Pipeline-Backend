import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import { validationResult } from "express-validator";

export const signup = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.array().length !== 0) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }
  const { email, password, username, phone, fullName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email,
    password: hashedPassword,
    username,
    phone,
    fullName,
  });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(201).json({
    status: "success",
    message: "User created successfully",
  });
});

export const signIn = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.array().length !== 0) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }
  const user = req.user;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "User logged out successfully",
  });
});

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(200).json({
          status: "fail",
          message: "User is not logged in",
        });
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new CustomError("User does not exist", 401));
      }
      res.status(200).json({
        status: "success",
        message: "User is logged in",
        data: user,
      });
    });
  } else {
    return next(new CustomError("Please login to get access", 401));
  }
});
