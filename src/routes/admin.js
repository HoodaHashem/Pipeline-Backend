import { Router } from "express";
import User from "../models/user.js";

const adminRouter = Router();

adminRouter.get("/users", async(req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: await User.find()
    }
  });
});

adminRouter.delete("/users", async(req, res) => {
  await User.deleteMany()
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "All users deleted successfully"
      });
    });
});

export default adminRouter;
