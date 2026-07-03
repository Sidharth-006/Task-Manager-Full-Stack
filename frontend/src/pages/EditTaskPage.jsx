import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import TaskForm from "../components/TaskForm";
import Loader from "../components/Loader";
import Message from "../components/Message";

function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/tasks/${id}`);

      setTask(response.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load task.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (formData) => {
    try {
      setSaving(true);

      const response = await api.put(`/tasks/${id}`, formData);

      setMessage(response.data.message);
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update task.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading task..." />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Update task</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Edit task details</h1>
            <p className="mt-2 text-sm text-slate-400">Adjust progress, timing, and notes as your plan evolves.</p>
          </div>
          <Link to="/dashboard" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
            ← Back to dashboard
          </Link>
        </div>
      </div>

      <Message type={messageType} text={message} />
      <TaskForm initialValues={task} onSubmit={handleUpdateTask} loading={saving} />
    </div>
  );
}

export default EditTaskPage;