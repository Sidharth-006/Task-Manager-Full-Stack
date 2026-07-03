import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import api from "../api/api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

const DashboardPage = () => {
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  useEffect(() => {
    if (location.state?.success) {
      setSuccess(location.state.success);
    }
  }, [location.state]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/tasks");

      if (res.data.success) {
        setTasks(res.data.data || []);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      await api.delete(`/tasks/${id}`);

      setTasks((prev) => prev.filter((task) => task.id !== id));

      setSuccess("Task deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to delete task."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    let data = [...tasks];

    if (search.trim()) {
      data = data.filter((task) =>
        task.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      data = data.filter(
        (task) => task.status === statusFilter
      );
    }

    switch (sortBy) {
      case "OLDEST":
        data.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "DUE_ASC":
        data.sort(
          (a, b) =>
            new Date(a.dueDate || 0) -
            new Date(b.dueDate || 0)
        );
        break;

      case "DUE_DESC":
        data.sort(
          (a, b) =>
            new Date(b.dueDate || 0) -
            new Date(a.dueDate || 0)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return data;
  }, [tasks, search, statusFilter, sortBy]);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard
              </h1>

              <p className="mt-2 text-gray-600">
                Manage all your tasks in one place.
              </p>
            </div>

            <Link
              to="/create-task"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
            >
              + Create Task
            </Link>

          </div>

          {error && (
            <div className="mb-6">
              <Message
                type="error"
                message={error}
              />
            </div>
          )}

          {success && (
            <div className="mb-6">
              <Message
                type="success"
                message={success}
              />
            </div>
          )}

          {/* Statistics */}

          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="text-sm text-gray-500">
                Total Tasks
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalTasks}
              </h2>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-6 shadow">
              <p className="text-sm text-yellow-700">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-800">
                {pendingTasks}
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-50 p-6 shadow">
              <p className="text-sm text-blue-700">
                In Progress
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-800">
                {inProgressTasks}
              </h2>
            </div>

            <div className="rounded-2xl bg-green-50 p-6 shadow">
              <p className="text-sm text-green-700">
                Completed
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-800">
                {completedTasks}
              </h2>
            </div>

          </div>

            {/* Search & Filters */}

          <div className="mb-8 rounded-2xl bg-white p-6 shadow">
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Search */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Search Tasks
                </label>

                <input
                  type="text"
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Filter by Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="ALL">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">
                    In Progress
                  </option>
                  <option value="COMPLETED">
                    Completed
                  </option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Sort Tasks
                </label>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="NEWEST">
                    Newest First
                  </option>

                  <option value="OLDEST">
                    Oldest First
                  </option>

                  <option value="DUE_ASC">
                    Due Date (Ascending)
                  </option>

                  <option value="DUE_DESC">
                    Due Date (Descending)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Task Count */}

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Your Tasks
            </h2>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              {filteredTasks.length} Task
              {filteredTasks.length !== 1 && "s"}
            </span>
          </div>

          {/* Empty State */}

          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl bg-white px-8 py-16 text-center shadow">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                <span className="text-4xl">📋</span>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-gray-800">
                No Tasks Found
              </h2>

              <p className="mx-auto mb-8 max-w-md text-gray-600">
                You don't have any tasks matching your current
                search or filter. Create a new task to get
                started.
              </p>

              <Link
                to="/create-task"
                className="inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Create Your First Task
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  loading={actionLoading}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;        