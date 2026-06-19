import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "taskflow",
    });
    if (conn) {
      console.log("Mongodb connection successfully!", conn.connection.name);
    }
  } catch (error) {
    console.log("Mongodb connection failed!", error);
    process.exit(1);
  }
};

export default connectDb;
