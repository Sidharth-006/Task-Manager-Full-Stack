const adminService = require("../services/admin.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

// Get All Users
const getUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getUsers();

  return successResponse(
    res,
    200,
    "Users fetched successfully",
    users
  );
});

// Get All Tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await adminService.getTasks();

  return successResponse(
    res,
    200,
    "Tasks fetched successfully",
    tasks
  );
});

// Dashboard Statistics
const getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getStats();

  return successResponse(
    res,
    200,
    "Statistics fetched successfully",
    stats
  );
});

// Activate / Deactivate User
const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive, role } = req.body;

  const user = await adminService.updateUserStatus(
    req.params.id,
    isActive,
    req.user.id,
    role
  );

  return successResponse(
    res,
    200,
    "User status updated successfully",
    user
  );
});

module.exports = {
  getUsers,
  getTasks,
  getStats,
  updateUserStatus,
};