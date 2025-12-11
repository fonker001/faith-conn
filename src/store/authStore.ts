import { create } from "zustand";
import { MemberProfile } from "@/types/types";

interface AuthState {
  user: Partial<MemberProfile> | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: Partial<MemberProfile> | null) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let storedUser: Partial<MemberProfile> | null = null;
  let storedAccessToken: string | null = null;
  let storedRefreshToken: string | null = null;

  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (userData) storedUser = JSON.parse(userData);
    if (access) storedAccessToken = access;
    if (refresh) storedRefreshToken = refresh;
  }

  return {
    user: storedUser,
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,

    setUser: (user) => {
      if (user) {
        const updated = { ...storedUser, ...user }; // ← merge so email can exist alone
        localStorage.setItem("user", JSON.stringify(updated));
        set({ user: updated });
      } else {
        localStorage.removeItem("user");
        set({ user: null });
      }
    },

    setAccessToken: (token) => {
      localStorage.setItem("accessToken", token);
      set({ accessToken: token });
    },

    setRefreshToken: (token) => {
      localStorage.setItem("refreshToken", token);
      set({ refreshToken: token });
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      set({ user: null, accessToken: null, refreshToken: null });
    },
  };
});
