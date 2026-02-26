import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);

export default app;
