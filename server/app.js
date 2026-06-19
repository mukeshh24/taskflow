import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.route.js";

const app = express();

const PORT = process.env.PORT || 8000;

// database connection
connectDb();

// middlewares
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.json({ status: 200, success: true, message: "Backend setup done!" });
});
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
