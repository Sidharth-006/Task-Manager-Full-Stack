const { User, Task } = require("../domain");
const createError = require("../utils/error");

// Get All Users
const getUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    order: [["createdAt", "DESC"]],
  });

  return users;
};

// Get All Tasks
const getTasks = async () => {
  const tasks = await Task.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return tasks;
};

// Dashboard Statistics
const getStats = async () => {
  const totalUsers = await User.count();

  const activeUsers = await User.count({
    where: {
      isActive: true,
    },
  });

  const inactiveUsers = await User.count({
    where: {
      isActive: false,
    },
  });

  const totalTasks = await Task.count();

  const completedTasks = await Task.count({
    where: {
      status: "COMPLETED",
    },
  });

  const pendingTasks = await Task.count({
    where: {
      status: "PENDING",
    },
  });

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    totalTasks,
    completedTasks,
    pendingTasks,
  };
};

// Activate / Deactivate User
const updateUserStatus = async (
  userId,
  isActive,
  currentAdminId,
  role
) => {
  if (
    typeof isActive === "boolean" &&
    Number(userId) === Number(currentAdminId)
  ) {
    throw createError(
      400,
      "You cannot deactivate your own account"
    );
  }

  const user = await User.findByPk(userId);

  if (!user) {
    throw createError(404, "User not found");
  }

  if (typeof isActive === "boolean") {
    user.isActive = isActive;
  }

  if (role) {
    user.role = role;
  }

  await user.save();

  const userData = user.toJSON();

  delete userData.password;

  return userData;
};

module.exports = {
  getUsers,
  getTasks,
  getStats,
  updateUserStatus,
};