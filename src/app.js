import e from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthRouter from "./routes/health.js";
import { loggerMiddleware } from "./middlewares/logger.js";
import globalErrors from "./middlewares/globalErrors.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import rateLimiter from "./utils/rateLimiter.js";

const app = e();
app.use(e.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(e.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(rateLimiter({ maxRequests: 200, seconds: 60 }));

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/users", userRouter);

app.use(globalErrors);

export default app;
