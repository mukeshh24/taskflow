import express from "express";
import protect from "../middlewares/protect.js";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

// All Task Routes are Private
taskRouter.post("/add", protect, createTask);
taskRouter.get("/all", protect, getAllTask);
taskRouter.get("/all/:taskId", protect, getTask);
taskRouter.put("/all/:taskId", protect, updateTask);
taskRouter.delete("/all/:taskId", protect, deleteTask);

export default taskRouter;
