/* ========================================================================== */
/*  GROUP MEETING MINUTES                                                        */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group meeting minutes */
export async function getAllGroupMeetingMinutes() {
  const res = await api.get("api/groups/meeting-minutes/");
  return res.data;
}

/** Create a new group meeting minutes  */
export async function createGroupMeetingMinutes(meetingMinutesData: unknown) {
  const res = await api.post("api/groups/meeting-minutes/", meetingMinutesData);
  return res.data;
}

/** Get details of a specific group meeting minutes by ID */
export async function getGroupMeetingMinutesById(meetingMinutesId: string) {
  const res = await api.get(`api/groups/meeting minutes/${meetingMinutesId}/`);
  return res.data;
}

/** Partially update a specific group meeting minutes by ID (PATCH) */
export async function partialUpdateGroupMeetingMinutesById(
  meetingMinutesId: string,
  meetingMinutesData: unknown
) {
  const res = await api.patch(
    `api/groups/meeting-minutes/${meetingMinutesId}/`,
    meetingMinutesData
  );
  return res.data;
}

/** Delete a specific group meeting minutes by ID */
export async function deleteGroupMeetingMinutesById(meetingMinutesId: string) {
  const res = await api.delete(
    `api/groups/meeting-minutes/${meetingMinutesId}/`
  );
  return res.data;
}
