/* ========================================================================== */
/*  PRIEST DASHBOARD & STATISTICS                                         */
/* ========================================================================== */

import api from "@/lib/axiosClient";
import {
  OutstationMembersResponse,
  PriestMonthlyStats,
  SystemUsersResponse,
} from "@/types/types";

export async function getPriestDashboard() {
  const res = await api.get("api/users/priest/dashboard/");
  return res.data;
}

export async function getPriestMonthlyStats(): Promise<PriestMonthlyStats[]> {
  const res = await api.get<PriestMonthlyStats[]>(
    "api/users/priest/monthly-stats/"
  );
  return res.data;
}

// for outstation priest
export async function getOutstationMembers(): Promise<OutstationMembersResponse> {
  const res = await api.get<OutstationMembersResponse>(
    "api/users/priest/outstation-members/"
  );
  return res.data;
}
// for parish priest
export async function getSystemUsers(): Promise<SystemUsersResponse> {
  const res = await api.get<SystemUsersResponse>(
    "api/users/priest/system-users/"
  );
  return res.data;
}
