import Task from "../models/taskModel.js";

// create task
async function createTask(req, res) {
  const { title, description, priority, dueDate, completed } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is Required!" });
  }

  try {
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === "Yes" || completed === true,
      owner: req.user.id,
    });

    const saveTask = await task.save();

    res.status(201).json({
      success: true,
      message: "Task Created Successfully!",
      data: saveTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// task data
async function taskData(req, res) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized!" });
  }

  try {
    const task = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Task Data Found Successfully!",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// single task data
async function taskDataById(req, res) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized!" });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Data Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Data Found Successfully!",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// update task
async function updateTask(req, res) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized!" });
  }

  const { ...data } = req.body;

  try {
    if (data.completed !== undefined) {
      data.completed = data.completed === "Yes" || data.completed === true;
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      data,
      { new: true, runValidators: true },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Update Successfully!",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

// delete task
async function deleteTask(req, res) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized!" });
  }

  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Delete Successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
}

export { createTask, taskData, taskDataById, updateTask, deleteTask };
