import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { v4 as uuid4 } from "uuid";
import path from "path";
import fs from "fs/promises";

export const patchUserData = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length !== 0) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }
  const user = req.user;

  const { email, password, username, phone, fullName } = req.body;
  if (!email && !password && !username && !phone && !fullName) {
    return res.status(400).json({
      status: "fail",
      message: "At least provide one field",
    });
  }
  if (email) user.email = email;
  if (username) user.username = username;
  if (phone) user.phone = phone;
  if (fullName) user.fullName = fullName;
  if (password) user.password = await bcrypt.hash(password, 12);
  user.save();
  return res.status(200).json({
    status: "success",
    message: "User data updated successfully",
  });
});

export const getUserData = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.array().length !== 0) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
    });
  }
  const data = req.user;
  return res.status(200).json({
    status: "success",
    data,
  });
});

export const uploadProfilePhoto = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const uniqueSuffix = uuid4();
  const filename = uniqueSuffix + path.extname(req.file.originalname);
  const filepath = path.join("public", filename);
  const user = req.user;
  user.photo = filename;
  await user.save();
  await fs.writeFile(filepath, req.file.buffer);

  res.status(200).json({ status: "success", filename });
});

export const deleteProfilePhoto = asyncHandler(async (req, res) => {
  const user = req.user;
  user.photo = "";
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "Profile photo deleted successfully",
  });
});
