/* ========================================================================== */
/*  GROUPS DASHBOARD & STATISTICS                                            */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get groups dashboard overview */
export async function getGroupsDashboard() {
  const res = await api.get("/api/groups/dashboard/");
  return res.data;
}

/** Get monthly groups statistics */
export async function getGroupsMonthlyStats() {
  const res = await api.get("/api/groups/monthly-stats/");
  return res.data;
}

/* ========================================================================== */
/*  GROUPS MANAGEMENT                                                        */
/* ========================================================================== */

/** Get all groups */
export async function getAllGroups() {
  const res = await api.get("/api/groups/");
  return res.data;
}

/** Create a new group */
export async function createGroup(groupData: unknown) {
  const res = await api.post("/api/groups/", groupData);
  return res.data;
}

/** Get a specific group by ID */
export async function getGroupById(groupId: string) {
  const res = await api.get(`/api/groups/${groupId}/`);
  return res.data;
}

/** Partially update a specific group by ID (PATCH) */
export async function partialUpdateGroupById(
  groupId: string,
  groupData: unknown
) {
  const res = await api.patch(`/api/groups/${groupId}/`, groupData);
  return res.data;
}

/** Delete a specific group by ID */
export async function deleteGroupById(groupId: string) {
  const res = await api.delete(`/api/groups/${groupId}/`);
  return res.data;
}

/** Activate a specific group by ID */
export async function activateGroupById(groupId: string) {
  const res = await api.post(`/api/groups/${groupId}/activate/`);
  return res.data;
}
