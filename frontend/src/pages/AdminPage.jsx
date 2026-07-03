import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Message from "../components/Message";
import api from "../api/api";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userSearch, setUserSearch] = useState("");
  const [taskSearch, setTaskSearch] = useState("");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, usersRes, tasksRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/users"),
        api.get("/admin/tasks"),
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      if (usersRes.data.success) {
        setUsers(usersRes.data.data || []);
      }

      if (tasksRes.data.success) {
        setTasks(tasksRes.data.data || []);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const updateRole = async (id, role) => {
    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      await api.patch(`/admin/users/${id}`, {
        role,
      });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                role,
              }
            : user
        )
      );

      setSuccess("User role updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update user role."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const toggleUserStatus = async (id, isActive) => {
    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      const res = await api.patch(`/admin/users/${id}`, {
        isActive,
      });

      const updatedUser = res.data?.data ?? res.data;

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                ...updatedUser,
              }
            : user
        )
      );

      setSuccess(
        isActive
          ? "User activated successfully."
          : "User deactivated successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update user status."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const value = userSearch.toLowerCase();

      return (
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value)
      );
    });
  }, [users, userSearch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const value = taskSearch.toLowerCase();

      return (
        task.title?.toLowerCase().includes(value) ||
        task.status?.toLowerCase().includes(value)
      );
    });
  }, [tasks, taskSearch]);

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
        <div className="mx-auto max-w-7xl px-4 py-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Manage users, tasks and application statistics.
            </p>
          </div>

          {error && (
            <div className="mb-5">
              <Message
                type="error"
                message={error}
              />
            </div>
          )}

          {success && (
            <div className="mb-5">
              <Message
                type="success"
                message={success}
              />
            </div>
          )}

          {/* Statistics */}

          <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Total Users
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {stats.totalUsers || users.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="text-gray-500">
                Total Tasks
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {stats.totalTasks || tasks.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-green-50 p-6 shadow">
              <p className="text-green-700">
                Completed
              </p>

              <h2 className="mt-3 text-3xl font-bold text-green-700">
                {stats.completedTasks || 0}
              </h2>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-6 shadow">
              <p className="text-yellow-700">
                Pending
              </p>

              <h2 className="mt-3 text-3xl font-bold text-yellow-700">
                {stats.pendingTasks || 0}
              </h2>
            </div>

          </div>
           {/* Users Section */}

          <div className="mb-10 rounded-2xl bg-white p-6 shadow">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Users
              </h2>

              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 md:w-80"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Joined
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-10 text-center text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 font-medium">
                          {user.name}
                        </td>

                        <td className="px-4 py-4">
                          {user.email}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.role === "ADMIN"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString("en-IN")
                            : "-"}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.isActive === false
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {user.isActive === false ? "Inactive" : "Active"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-wrap justify-center gap-2">
                            <select
                              value={user.role}
                              disabled={actionLoading}
                              onChange={(e) =>
                                updateRole(
                                  user.id,
                                  e.target.value
                                )
                              }
                              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                            >
                              <option value="USER">
                                USER
                              </option>

                              <option value="ADMIN">
                                ADMIN
                              </option>
                            </select>

                            <button
                              type="button"
                              disabled={actionLoading}
                              onClick={() =>
                                toggleUserStatus(user.id, !user.isActive)
                              }
                              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                                user.isActive === false
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-red-600 text-white hover:bg-red-700"
                              }`}
                            >
                              {user.isActive === false ? "Activate" : "Deactivate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        {/* Tasks Section */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              All Tasks
            </h2>

            <input
              type="text"
              placeholder="Search tasks..."
              value={taskSearch}
              onChange={(e) => setTaskSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 md:w-80"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Created By
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-10 text-center text-gray-500"
                    >
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            task.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : task.status === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </td>

                      <td className="px-4 py-4">
                        {task.User?.name ||
                          task.user?.name ||
                          "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default AdminPage;