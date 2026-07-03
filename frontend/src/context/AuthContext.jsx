import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const payload = res.data?.data ?? res.data;

    localStorage.setItem("token", payload.token);
    setUser(payload.user);

    return payload;
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);

    return res.data?.data ?? res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const getProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      const payload = res.data?.data ?? res.data;
      setUser(payload);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}