const express = require("express");

const router = express.Router();

const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createTaskSchema,
  updateTaskSchema,
} = require("../dto/task.dto");

// Protect all task routes
router.use(authMiddleware);

// Create Task
router.post(
  "/",
  validate(createTaskSchema),
  taskController.createTask
);

// Get All Tasks
router.get(
  "/",
  taskController.getTasks
);

// Get Single Task
router.get(
  "/:id",
  taskController.getTaskById
);

// Update Task
router.put(
  "/:id",
  validate(updateTaskSchema),
  taskController.updateTask
);

// Delete Task
router.delete(
  "/:id",
  taskController.deleteTask
);

module.exports = router;