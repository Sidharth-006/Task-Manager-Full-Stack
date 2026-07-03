const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const {
  successResponse,
} = require("../utils/response");

// Register
const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  return successResponse(
    res,
    201,
    "User registered successfully",
    user
  );
});

// Login
const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return successResponse(
    res,
    200,
    "Login successful",
    result
  );
});

// Profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.id);

  return successResponse(
    res,
    200,
    "Profile fetched successfully",
    user
  );
});

module.exports = {
  register,
  login,
  getProfile,
};