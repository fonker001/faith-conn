/* ========================================================================== */
/*  GROUP TYPES                                                        */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group types */
export async function getAllGroupTypes() {
  const res = await api.get("api/groups/group-types/");
  return res.data;
}

/** Create a new group type  */
export async function createGroupType(typeData: unknown) {
  const res = await api.post("api/groups/group-types/", typeData);
  return res.data;
}

/** Get details of a specific group type by ID */
export async function getGroupTypeById(typeId: string) {
  const res = await api.get(`api/groups/group-types/${typeId}/`);
  return res.data;
}

/** Partially update a specific group type by ID (PATCH) */
export async function partialUpdateGroupTypeById(
  typeId: string,
  typeData: unknown
) {
  const res = await api.patch(`api/groups/group-types/${typeId}/`, typeData);
  return res.data;
}

/** Delete a specific group type by ID */
export async function deleteGroupTypeById(typeId: string) {
  const res = await api.delete(`api/groups/group-types/${typeId}/`);
  return res.data;
}
