const { User } = require("../domain");
const {
  hashPassword,
  comparePassword,
} = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const createError = require("../utils/error");

const register = async ({ name, email, password }) => {
  // Check duplicate email
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw createError(409, "Email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Remove password before sending response
  const userData = user.toJSON();
  delete userData.password;

  return userData;
};

const login = async ({ email, password }) => {
  // Find user
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw createError(401, "Invalid email or password");
  }

  // Check account status
  if (!user.isActive) {
    throw createError(403, "Account is deactivated");
  }

  // Compare password
  const isPasswordMatched = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw createError(401, "Invalid email or password");
  }

  // Generate JWT
  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  // Remove password
  const userData = user.toJSON();
  delete userData.password;

  return {
    token,
    user: userData,
  };
};

const getProfile = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw createError(404, "User not found");
  }

  const userData = user.toJSON();
  delete userData.password;

  return userData;
};

module.exports = {
  register,
  login,
  getProfile,
};