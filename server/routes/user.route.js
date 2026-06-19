import express from "express";
import {
  getUser,
  userDelete,
  userLogin,
  userLogout,
  userRegister,
  userUpdate,
} from "../controllers/user.controller.js";
import protect from "../middlewares/protect.js";

const userRouter = express.Router();

// public API's
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

// private API's
userRouter.get("/profile", protect, getUser);
userRouter.put("/profile", protect, userUpdate);
userRouter.get("/logout", protect, userLogout);
userRouter.delete("/profile", protect, userDelete);

export default userRouter;
