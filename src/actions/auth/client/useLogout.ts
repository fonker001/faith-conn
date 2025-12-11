"use client";

import api from "@/lib/axiosClient";
import { useAuthStore } from "@/store/authStore";

interface LogoutResponse {
  ok: boolean;
  message: string;
}

export async function logout(): Promise<LogoutResponse> {
  const { logout: clearUser } = useAuthStore.getState();

  try {
    await api.post("/api/auth/logout"); // cookies handled automatically
    clearUser();
    return { ok: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout error:", error);
    clearUser();
    return { ok: false, message: "Logout failed" };
  }
}
