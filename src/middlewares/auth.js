import User from "../models/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const validateJwtCookie = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);
  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }
  req.user = user;
  next();
});

export default validateJwtCookie;
