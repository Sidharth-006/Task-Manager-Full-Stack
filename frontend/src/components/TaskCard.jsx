import { Link } from "react-router-dom";

const statusStyles = {
  PENDING: {
    label: "Pending",
    badge: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    badge: "bg-blue-100 text-blue-800 border border-blue-200",
  },
  COMPLETED: {
    label: "Completed",
    badge: "bg-green-100 text-green-800 border border-green-200",
  },
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const TaskCard = ({ task, onDelete }) => {
  const status =
    statusStyles[task.status] || statusStyles.PENDING;

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      onDelete(task.id);
    }
  };

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-bold text-gray-800">
            {task.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm text-gray-600">
            {task.description || "No description provided."}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}
        >
          {status.label}
        </span>
      </div>

      {/* Information */}
      <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            Due Date
          </span>

          <span className="font-semibold text-gray-700">
            {formatDate(task.dueDate)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            Created
          </span>

          <span className="font-semibold text-gray-700">
            {formatDate(task.createdAt)}
          </span>
        </div>

        {task.updatedAt && (
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">
              Updated
            </span>

            <span className="font-semibold text-gray-700">
              {formatDate(task.updatedAt)}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to={`/edit-task/${task.id}`}
          className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-md"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;