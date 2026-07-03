const User = require("./user.domain");
const Task = require("./task.domain");

// One User -> Many Tasks
User.hasMany(Task, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

// One Task -> One User
Task.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  User,
  Task,
};