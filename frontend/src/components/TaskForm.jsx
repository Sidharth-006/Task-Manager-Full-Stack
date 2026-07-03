import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
];

const TaskForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  submitText = "Save Task",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "PENDING",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "PENDING",
      dueDate: initialData?.dueDate
        ? new Date(initialData.dueDate).toISOString().split("T")[0]
        : "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Task title must be at least 3 characters";
    }

    if (formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      dueDate: formData.dueDate || null,
    };

    await onSubmit(payload);
  };

  return (
    <div className="w-full rounded-2xl bg-white p-6 shadow-lg md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Task Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className={`w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none ${
              errors.title
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            }`}
          />

          {errors.title && (
            <p className="mt-2 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your task..."
            className={`w-full resize-none rounded-xl border px-4 py-3 text-sm transition-all outline-none ${
              errors.description
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            }`}
          />

          <div className="mt-2 flex items-center justify-between">
            {errors.description ? (
              <p className="text-sm text-red-500">{errors.description}</p>
            ) : (
              <span />
            )}

            <p className="text-xs text-gray-500">
              {formData.description.length}/500
            </p>
          </div>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="dueDate"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Due Date
          </label>

          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none ${
              errors.dueDate
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            }`}
          />

          {errors.dueDate && (
            <p className="mt-2 text-sm text-red-500">{errors.dueDate}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ${
              loading
                ? "cursor-not-allowed bg-indigo-300"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
            }`}
          >
            {loading ? "Please wait..." : submitText}
          </button>

          <button
            type="reset"
            onClick={() => {
              setFormData({
                title: "",
                description: "",
                status: "PENDING",
                dueDate: "",
              });
              setErrors({});
            }}
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;