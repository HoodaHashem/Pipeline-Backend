import { Router } from "express";
import validateJwtCookie from "../middlewares/auth.js";
import {
  getAllFriendRequests,
  SearchForFriend,
  sendFriendRequest,
} from "../controllers/friends.js";
import { checkSchema } from "express-validator";
import { sendFriendRequestSchema } from "../errors/sendFriendRequestSchema.js";
import { checkFriendRequestSchema } from "../errors/checkFriendRequest.js";
import checkSearch from "../errors/checkSearch.js";

const friendsRouter = Router();

friendsRouter.use(validateJwtCookie);

friendsRouter.get("/", getAllFriendRequests);

friendsRouter.post(
  "/send/:id",
  checkSchema(sendFriendRequestSchema),
  sendFriendRequest,
);

friendsRouter.post("/search", checkSchema(checkSearch), SearchForFriend);

// friendsRouter.post(
//   "/accept/:id",
//   checkSchema(checkFriendRequestSchema),
//   acceptFriendRequest,
// );
//
// friendsRouter.post(
//   "/reject/:id",
//   checkSchema(checkFriendRequestSchema),
//   rejectFriendRequest,
// );

export default friendsRouter;
