import express from "express";
import cors from "cors";

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

export default app;
