/* ========================================================================== */
/*  GROUP EVENT TYPES                                                        */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group event types */
export async function getAllGroupEventTypes() {
  const res = await api.get("api/groups/event-types/");
  return res.data;
}

/** Create a new group event type */
export async function createGroupEventType(eventTypeData: unknown) {
  const res = await api.post("api/groups/event-types/", eventTypeData);
  return res.data;
}

/** Get details of a specific group event type by ID */
export async function getGroupEventTypeById(eventTypeId: string) {
  const res = await api.get(`api/groups/event-types/${eventTypeId}/`);
  return res.data;
}

/** Partially update a specific group event type by ID (PATCH) */
export async function partialUpdateGroupEventTypeById(
  eventTypeId: string,
  eventTypeData: unknown
) {
  const res = await api.patch(
    `api/groups/event-types/${eventTypeId}/`,
    eventTypeData
  );
  return res.data;
}

/** Delete a specific group event type by ID */
export async function deleteGroupEventTypeById(eventTypeId: string) {
  const res = await api.delete(`api/groups/event-types/${eventTypeId}/`);
  return res.data;
}
