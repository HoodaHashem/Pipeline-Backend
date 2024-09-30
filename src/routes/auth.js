import { Router } from "express";
import { signup, isLoggedIn, logout, signIn } from "../controllers/auth.js";
import { checkSchema } from "express-validator";
import { signUpValidationSchema } from "../errors/signUpSchema.js";
import { signInValidationSchema } from "../errors/signInSchema.js";

const authRouter = Router();

authRouter.post("/signup", checkSchema(signUpValidationSchema), signup);
authRouter.post("/signin", checkSchema(signInValidationSchema), signIn);
authRouter.get("/logout", logout);
authRouter.get("/", isLoggedIn);

// authRouter.post("/forgot-password", forgotPassword);
// authRouter.post("/reset-password", resetPassword);
// authRouter.post("/verify-email", verifyEmail);
// authRouter.post("/resend-verification-email", resendVerificationEmail);

export default authRouter;
