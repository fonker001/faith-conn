/* ========================================================================== */
/*  GROUP ROLES                                                        */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group roles */
export async function getAllGroupRoles() {
  const res = await api.get("api/groups/group-roles/");
  return res.data;
}

/** Create a new group role  */
export async function createGroupRole(roleData: unknown) {
  const res = await api.post("api/groups/group-roles/", roleData);
  return res.data;
}

/** Get details of a specific group role by ID */
export async function getGroupRoleById(roleId: string) {
  const res = await api.get(`api/groups/group-roles/${roleId}/`);
  return res.data;
}

/** Partially update a specific group role by ID (PATCH) */
export async function partialUpdateGroupRoleById(
  roleId: string,
  roleData: unknown
) {
  const res = await api.patch(`api/groups/group-roles/${roleId}/`, roleData);
  return res.data;
}

/** Delete a specific group role by ID */
export async function deleteGroupRoleById(roleId: string) {
  const res = await api.delete(`api/groups/group-roles/${roleId}/`);
  return res.data;
}
