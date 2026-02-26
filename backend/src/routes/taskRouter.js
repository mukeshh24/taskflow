import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  createTask,
  deleteTask,
  taskData,
  taskDataById,
  updateTask,
} from "../controllers/taskContoller.js";

const taskRouter = express.Router();

// taskRouter.get("/all", userAuth, taskData);
// taskRouter.past("/all", userAuth, createTask);
// taskRouter.get("/all/:id", userAuth, taskDataById);
// taskRouter.get("/all/:id", userAuth, updateTask);
// taskRouter.get("/all/:id", userAuth, deleteTask);

taskRouter.route("/all").post(userAuth, createTask).get(userAuth, taskData);
taskRouter
  .route("all/:id")
  .get(userAuth, taskDataById)
  .put(userAuth, updateTask)
  .delete(userAuth, deleteTask);

export default taskRouter;
