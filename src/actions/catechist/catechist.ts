/* ========================================================================== */
/*  CATECHISM DASHBOARD & STATISTICS                                         */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get catechist dashboard overview */
export async function getCatechistDashboard() {
  const res = await api.get("api/catechism/dashboard/");
  return res.data;
}

/** Get monthly catechism statistics */
export async function getCatechistMonthlyStats() {
  const res = await api.get("api/catechism/monthly-stats/");
  return res.data;
}

/* ========================================================================== */
/*  CATECHISM RECORDS MANAGEMENT                                             */
/* ========================================================================== */

/** Get all catechism records */
export async function getAllCatechismRecords() {
  const res = await api.get("api/catechism/records/");
  return res.data;
}

/** Create a new catechism record */
export async function createCatechismRecord(recordData: unknown) {
  const res = await api.post("api/catechism/records/", recordData);
  return res.data;
}

/** Get a specific catechism record by ID */
export async function getCatechismRecordById(recordId: string) {
  const res = await api.get(`api/catechism/records/${recordId}/`);
  return res.data;
}

/** Update a specific catechism record by ID */
export async function updateCatechismRecordById(
  recordId: string,
  recordData: unknown
) {
  const res = await api.patch(
    `api/catechism/records/${recordId}/`,

    recordData
  );
  return res.data;
}

/** Delete a specific catechism record by ID */
export async function deleteCatechismRecordById(recordId: string) {
  const res = await api.delete(`api/catechism/records/${recordId}/`);
  return res.data;
}

/* ========================================================================== */
/*  CATECHISM SESSIONS MANAGEMENT                                            */
/* ========================================================================== */

/** Get all catechism sessions */
export async function getAllCatechismSessions() {
  const res = await api.get("api/catechism/sessions/");
  return res.data;
}

/** Create a new catechism session */
export async function createCatechismSession(sessionData: unknown) {
  const res = await api.post("api/catechism/sessions/", sessionData);
  return res.data;
}

/** Get details of a specific catechism session by ID */
export async function getCatechismSessionById(sessionId: string) {
  const res = await api.get(`api/catechism/sessions/${sessionId}/`);
  return res.data;
}

/** Partially update a specific catechism session by ID (PATCH) */
export async function partialUpdateCatechismSessionById(
  sessionId: string,
  sessionData: unknown
) {
  const res = await api.patch(
    `api/catechism/sessions/${sessionId}/`,
    sessionData
  );
  return res.data;
}

/* ========================================================================== */
/*  CATECHIST AVAILABILITY                                                   */
/* ========================================================================== */

/** Get list of all available catechists for sessions */
export async function getAllAvailableCatechists() {
  const res = await api.get("api/catechism/sessions/catechists/available/");
  return res.data;
}
