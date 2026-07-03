import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import Message from "../components/Message";

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTask = async (taskData) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/tasks", taskData);

      if (response.data.success) {
        navigate("/dashboard", {
          state: {
            success: "Task created successfully.",
          },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="mx-auto max-w-3xl px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Task
            </h1>

            <p className="mt-2 text-gray-600">
              Fill in the details below to create a new task.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6">
              <Message
                type="error"
                message={error}
              />
            </div>
          )}

          {/* Task Form */}
          <TaskForm
            onSubmit={handleCreateTask}
            loading={loading}
            submitText="Create Task"
          />
        </div>
      </div>
    </>
  );
};

export default CreateTaskPage;