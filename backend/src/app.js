import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

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
app.use("/api/user", userRouter);

export default app;
