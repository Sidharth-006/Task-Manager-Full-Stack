const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Protect all admin routes
router.use(authMiddleware);

// Allow only ADMIN users
router.use(roleMiddleware("ADMIN"));

// Get all users
router.get(
  "/users",
  adminController.getUsers
);

// Get all tasks
router.get(
  "/tasks",
  adminController.getTasks
);

// Dashboard statistics
router.get(
  "/stats",
  adminController.getStats
);

// Activate / Deactivate user
router.patch(
  "/users/:id",
  adminController.updateUserStatus
);

module.exports = router;