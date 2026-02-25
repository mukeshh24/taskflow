import express from "express";
import {
  userData,
  userLogin,
  userPasswordUpdate,
  userRegister,
  userUpdate,
} from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

// public routes
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

// private routes
userRouter.get("/user", userAuth, userData);
userRouter.put("/profile", userAuth, userUpdate);
userRouter.put("/password", userAuth, userPasswordUpdate);

export default userRouter;
