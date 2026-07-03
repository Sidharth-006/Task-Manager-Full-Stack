const { Task } = require("../domain");
const createError = require("../utils/error");

const createTask = async (taskData, userId) => {
  const task = await Task.create({
    ...taskData,
    userId,
  });

  return task;
};

const getTasks = async (userId) => {
  return Task.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw createError(404, "Task not found");
  }

  return task;
};

const updateTask = async (taskId, userId, updates) => {
  const task = await Task.findOne({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw createError(404, "Task not found");
  }

  await task.update(updates);

  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOne({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw createError(404, "Task not found");
  }

  await task.destroy();
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};