import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toast.error("Email must be valid");
    }

    if (!form.password.trim()) {
      return toast.error("Password is required");
    }

    if (form.password.length < 6) {
      return toast.error("Password must have at least six characters");
    }

    if (!form.confirmPassword.trim()) {
      return toast.error("Confirm password is required");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Password and confirm password must match");
    }

    try {
      setLoading(true);

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="flex justify-center mb-6">
          <FaClipboardList
            className="text-indigo-600"
            size={60}
          />
        </div>

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Register to manage your tasks
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="font-medium">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold"
          >
            {loading
              ? "Please wait..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-indigo-600 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}