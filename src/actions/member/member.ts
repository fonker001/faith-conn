import api from "@/lib/axiosClient";
import { MemberProfile } from "@/types/types";

// Fetch user profile
export async function getMemberProfile() {
  const res = await api.get<MemberProfile>("/api/users/profile/");
  return res.data;
}

// Update user profile (PATCH is preferred for partial updates)
export async function updateMemberProfile(profileData: Partial<MemberProfile>) {
  const res = await api.patch("/api/users/profile/", profileData);
  return res.data;
}
