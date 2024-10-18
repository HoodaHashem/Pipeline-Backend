import { Router } from "express";
import validateJwtCookie from "../middlewares/auth.js";
import { checkSchema } from "express-validator";
import checkIfNotDublicated from "../errors/checkIfNotDublicated.js";
import {
  patchUserData,
  getUserData,
  uploadProfilePhoto,
  deleteProfilePhoto,
} from "../controllers/users.js";
import checkPhoto from "../errors/checkPhoto.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const userRouter = Router();

userRouter.use(validateJwtCookie);

userRouter.get("/", getUserData);
userRouter.patch("/", checkSchema(checkIfNotDublicated), patchUserData);
userRouter.post(
  "/upload",
  upload.single("avatar"),
  checkSchema(checkPhoto),
  uploadProfilePhoto,
);
userRouter.delete("/profile-photo", deleteProfilePhoto);

export default userRouter;
