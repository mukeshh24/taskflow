import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/connectDB.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server Running on PORT : ${PORT}`);
    });
  } catch (error) {
    console.log(`Failed to Start Server`, error);
    process.exit(1);
  }
};

startServer();
