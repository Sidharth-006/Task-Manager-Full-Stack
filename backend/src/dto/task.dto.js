const createTaskSchema = (data) => {
  const { title, status, dueDate } = data;

  if (!title || title.trim() === "") {
    return "Title is required";
  }

  const validStatus = ["PENDING", "IN_PROGRESS", "COMPLETED"];

  if (status && !validStatus.includes(status)) {
    return "Invalid task status";
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return "Invalid due date";
  }

  return null;
};

const updateTaskSchema = (data) => {
  const { title, status, dueDate } = data;

  // update allows partial fields

  if (title !== undefined && title.trim() === "") {
    return "Title cannot be empty";
  }

  const validStatus = ["PENDING", "IN_PROGRESS", "COMPLETED"];

  if (status && !validStatus.includes(status)) {
    return "Invalid task status";
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    return "Invalid due date";
  }

  return null;
};

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};