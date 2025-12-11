
/* ========================================================================== */
/*  GROUP EVENT                                                        */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group event */
export async function getAllGroupEvent() {
  const res = await api.get("api/groups/events/");
  return res.data;
}

/** Create a new group event  */
export async function createGroupEvent(eventData: unknown) {
  const res = await api.post("api/groups/events/", eventData);
  return res.data;
}

/** Get details of a specific group event by ID */
export async function getGroupEventById(eventId: string) {
  const res = await api.get(`api/groups/events/${eventId}/`);
  return res.data;
}

/** Partially update a specific group event by ID (PATCH) */
export async function partialUpdateGroupEventById(
  eventId: string,
  eventData: unknown
) {
  const res = await api.patch(`api/groups/events/${eventId}/`, eventData);
  return res.data;
}

/** Delete a specific group event by ID */
export async function deleteGroupEventById(eventId: string) {
  const res = await api.delete(`api/groups/events/${eventId}/`);
  return res.data;
}
