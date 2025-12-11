/* ========================================================================== */
/*  BOOKINGS                                           */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all bookings records */
export async function getAllBookingRecords() {
  const res = await api.get("api/bookings/bookings/");
  return res.data;
}

/** Create a new  bookings record */
export async function createBookingRecord(bookingsData: unknown) {
  const res = await api.post("api/bookings/bookings/", bookingsData);
  return res.data;
}

/** Get details of a specific  bookings record by ID */
export async function getBookingRecordById(bookingsId: string) {
  const res = await api.get(`api/bookings/bookings/${bookingsId}/`);
  return res.data;
}

/** Partially update a specific  bookings record by ID (PATCH) */
export async function partialUpdateBookingRecordById(
  bookingsId: string,
  bookingsData: unknown
) {
  const res = await api.patch(
    `api/bookings/bookings/${bookingsId}/`,
    bookingsData
  );
  return res.data;
}

/** Delete a specific  bookings record by ID */
export async function deleteBookingRecordById(bookingsId: string) {
  const res = await api.delete(`api/bookings/bookings/${bookingsId}/`);
  return res.data;
}

/** Approve booking records for a specific  ID */
export async function approveBookingRecordById(Id: string) {
  const res = await api.post(`api/bookings/bookings/${Id}/approve/`);
  return res.data;
}

/** Reject booking records for a specific  ID */
export async function rejectBookingRecordById(Id: string) {
  const res = await api.post(`api/bookings/bookings/${Id}/reject/`);
  return res.data;
}

/** Bookings Notifications */
export async function getBookingNotifications() {
  const res = await api.get(`api/bookings/notifications/`);
  return res.data;
}

/** Get bookings notification by id */
export async function getBookingNotificationById(notificationId: string) {
  const res = await api.get(`api/bookings/notifications/${notificationId}/`);
  return res.data;
}
