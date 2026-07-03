const taskService = require("../services/task.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

// Create Task
const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body, req.user.id);

  return successResponse(
    res,
    201,
    "Task created successfully",
    task
  );
});

// Get All Tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getTasks(req.user.id);

  return successResponse(
    res,
    200,
    "Tasks fetched successfully",
    tasks
  );
});

// Get One Task
const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(
    req.params.id,
    req.user.id
  );

  return successResponse(
    res,
    200,
    "Task fetched successfully",
    task
  );
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    req.params.id,
    req.user.id,
    req.body
  );

  return successResponse(
    res,
    200,
    "Task updated successfully",
    task
  );
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(
    req.params.id,
    req.user.id
  );

  return successResponse(
    res,
    200,
    "Task deleted successfully"
  );
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};