import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import api from "../api/axios";

export default function AppInitializer() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) return;

      try {
        const res = await api.get("/auth/profile");
        setAuth(res.data, token);
      } catch {
        console.error("Session expired");
      }
    };

    loadUser();
  }, [token, setAuth]);

  return null;
}
