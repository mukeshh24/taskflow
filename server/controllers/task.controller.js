import Task from "../models/task.model.js";
import errorHandler from "../utils/errorHandler.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    if (!title) {
      return next(errorHandler(400, "Title is required"));
    }

    const task = new Task({
      authorId: req.user.id,
      title,
      description,
      priority,
      dueDate,
      completed: completed === "Yes" || completed === true,
    });

    await task.save();

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const authorId = req.user.id;

    if (!authorId) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const task = await Task.find({ authorId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      success: true,
      message: "All task found successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const { taskId } = req.params;

    if (!authorId) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const task = await Task.findOne({ _id: taskId, authorId }).lean().exec();
    if (!task) {
      return next(errorHandler(404, "Task not found"));
    }

    res.status(200).json({
      success: true,
      message: "Task found successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const { taskId } = req.params;
    let { title, description, priority, dueDate, completed } = req.body;

    if (!authorId) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (completed !== undefined) {
      updateData.completed = completed === "Yes" || completed === true;
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        authorId,
      },
      updateData,
      { new: true, runValidators: true },
    );

    if (!task) {
      return next(errorHandler(404, "Task not found"));
    }

    res.status(200).json({
      success: true,
      message: "Task update successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const authorId = req.user.id;
    const { taskId } = req.params;

    if (!authorId) {
      return next(errorHandler(401, "Unauthorized"));
    }

    const task = await Task.findOneAndDelete({
      _id: taskId,
      authorId,
    });

    if (!task) {
      return next(errorHandler(404, "Task not found"));
    }

    res.status(200).json({
      success: true,
      message: "Task delete successfully",
    });
  } catch (error) {
    next(error);
  }
};
