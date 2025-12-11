/* ========================================================================== */
/*  GROUP MEMBERSHIP                                                        */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group members */
export async function getAllGroupMembers() {
  const res = await api.get("api/groups/group-memberships/");
  return res.data;
}

/** Create a new group member  */
export async function createGroupMembers(membershipData: unknown) {
  const res = await api.post("api/groups/group-memberships/", membershipData);
  return res.data;
}

/** Get details of a specific group member by ID */
export async function getGroupMembersById(memberId: string) {
  const res = await api.get(`api/groups/group-memberships/${memberId}/`);
  return res.data;
}

/** Partially update a specific group member by ID (PATCH) */
export async function partialUpdateGroupMembersById(
  memberId: string,
  membershipData: unknown
) {
  const res = await api.patch(
    `api/groups/group-memberships/${memberId}/`,
    membershipData
  );
  return res.data;
}

/** Delete a specific group member by ID */
export async function deleteGroupMembersById(memberId: string) {
  const res = await api.delete(`api/groups/group-memberships/${memberId}/`);
  return res.data;
}
