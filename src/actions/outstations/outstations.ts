/* ========================================================================== */
/*  OUTSTATIONS                                                        */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group types */
export async function getAllGroupTypes() {
  const res = await api.get("api/outstations/");
  return res.data;
}

/** Create a new group type  */
export async function createGroupType(outstationData: unknown) {
  const res = await api.post("api/outstations/", outstationData);
  return res.data;
}

/** Get details of a specific group type by ID */
export async function getGroupTypeById(outstationId: string) {
  const res = await api.get(`api/outstations/${outstationId}/`);
  return res.data;
}

/** Partially update a specific group type by ID (PATCH) */
export async function partialUpdateGroupTypeById(
  outstationId: string,
  outstationData: unknown
) {
  const res = await api.patch(
    `api/outstations/${outstationId}/`,
    outstationData
  );
  return res.data;
}

/** Delete a specific group type by ID */
export async function deleteGroupTypeById(outstationId: string) {
  const res = await api.delete(`api/outstations/${outstationId}/`);
  return res.data;
}
