import { Router } from "express";
import validateJwtCookie from "../middlewares/auth.js";
import {
  getAllFriendRequests,
  sendFriendRequest,
} from "../controllers/friends.js";
import { checkSchema } from "express-validator";
import { sendFriendRequestSchema } from "../errors/sendFriendRequestSchema.js";

const friendsRouter = Router();

friendsRouter.use(validateJwtCookie);
friendsRouter.get("/", getAllFriendRequests);
friendsRouter.post(
  "/send/:id",
  checkSchema(sendFriendRequestSchema),
  sendFriendRequest,
);

export default friendsRouter;
