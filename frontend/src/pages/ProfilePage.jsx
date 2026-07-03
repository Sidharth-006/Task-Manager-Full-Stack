import { useEffect, useState } from "react";

import api from "../api/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/auth/profile");

      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

      <div className="min-h-screen bg-gray-100 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Profile
            </h1>

            <p className="mt-2 text-gray-600">
              View your account information.
            </p>
          </div>

          {error && (
            <div className="mb-6">
              <Message
                type="error"
                message={error}
              />
            </div>
          )}

          {user && (
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white">
                <div className="flex flex-col items-center gap-5 md:flex-row">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-indigo-600">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold">
                      {user.name}
                    </h2>

                    <p className="mt-1 text-indigo-100">
                      {user.email}
                    </p>

                    {user.role && (
                      <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid gap-6 p-8 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-gray-500">
                    Full Name
                  </label>

                  <div className="mt-2 rounded-xl border bg-gray-50 p-4">
                    {user.name}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500">
                    Email Address
                  </label>

                  <div className="mt-2 rounded-xl border bg-gray-50 p-4">
                    {user.email}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500">
                    Role
                  </label>

                  <div className="mt-2 rounded-xl border bg-gray-50 p-4 capitalize">
                    {user.role || "User"}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-500">
                    User ID
                  </label>

                  <div className="mt-2 rounded-xl border bg-gray-50 p-4 break-all">
                    {user.id}
                  </div>
                </div>

                {user.createdAt && (
                  <div>
                    <label className="text-sm font-semibold text-gray-500">
                      Joined On
                    </label>

                    <div className="mt-2 rounded-xl border bg-gray-50 p-4">
                      {new Date(user.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                )}

                {user.updatedAt && (
                  <div>
                    <label className="text-sm font-semibold text-gray-500">
                      Last Updated
                    </label>

                    <div className="mt-2 rounded-xl border bg-gray-50 p-4">
                      {new Date(user.updatedAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;