import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 8000;

// database connection
connectDb();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173/"],
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

app.listen(PORT, () => {
  console.log(`Server running in PORT : ${PORT}`);
});
