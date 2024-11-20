import { Router } from "express";
import { getChatInfo } from "../controllers/chats.js";
import { checkSchema } from "express-validator";
import { checkGetChatInfo } from "../errors/checkGetChatInfo.js";
import validateJwtCookie from "../middlewares/auth.js";

const chatsRouter = Router();
chatsRouter.use(validateJwtCookie);
chatsRouter.get("/:chatId", checkSchema(checkGetChatInfo), getChatInfo);

export default chatsRouter;
