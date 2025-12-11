/* ========================================================================== */
/*  GROUPS ATTENDANCE MANAGEMENT                                             */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all group attendance records */
export async function getAllGroupAttendanceRecords() {
  const res = await api.get("api/groups/attendance/");
  return res.data;
}

/** Create a new group attendance record */
export async function createGroupAttendanceRecord(attendanceData: unknown) {
  const res = await api.post("api/groups/attendance/", attendanceData);
  return res.data;
}

/** Get details of a specific group attendance record by ID */
export async function getGroupAttendanceRecordById(attendanceId: string) {
  const res = await api.get(`api/groups/attendance/${attendanceId}/`);
  return res.data;
}

/** Partially update a specific group attendance record by ID (PATCH) */
export async function partialUpdateGroupAttendanceRecordById(
  attendanceId: string,
  attendanceData: unknown
) {
  const res = await api.patch(
    `api/groups/attendance/${attendanceId}/`,
    attendanceData
  );
  return res.data;
}

/** Delete a specific group attendance record by ID */
export async function deleteGroupAttendanceRecordById(attendanceId: string) {
  const res = await api.delete(`api/groups/attendance/${attendanceId}/`);
  return res.data;
}

/** Get all attendance records for a specific group  */
export async function getGroupAttendanceByGroupId(groupId: string) {
  const res = await api.get(`api/groups/groups/${groupId}/attendance/`);
  return res.data;
}

/** Create bulk attendance records for a specific group */
export async function createBulkGroupAttendanceRecords(
  groupId: string,
  attendanceData: unknown
) {
  const res = await api.post(
    `api/groups/groups/${groupId}/attendance/bulk/`,

    attendanceData
  );
  return res.data;
}
