import api from "@/lib/axiosClient";
import { MemberProfile } from "@/types/types";
import { useAuthStore } from "@/store/authStore";

export async function getProfile() {
  const token = localStorage.getItem("accessToken");
  console.log("Token being sent:", token); // must be defined

  if (!token) throw new Error("No access token available");

  const res = await api.get("/api/users/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

