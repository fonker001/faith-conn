/* ========================================================================== */
/*  ANNOUNCEMENTS                                                       */
/* ========================================================================== */

import api from "@/lib/axiosClient";

/** Get all announcements */
export async function getAllAnnouncements() {
  const res = await api.get("/api/announcements/public/");
  return res.data;
}

/** Get announcements by ID*/
export async function getAnnouncementsById(announcementId: string) {
  const res = await api.get(`/api/announcements/public/${announcementId}/`);
  return res.data;
}

/** Get catechism announcements */
export async function getAllCatechismAnnouncements() {
  const res = await api.get("/api/announcements/public/catechism/");
  return res.data;
}

/** Get outstation announcements */
export async function getOutstationAnnouncements(outstationId: string) {
  const res = await api.get(
    ` /api/announcements/public/catechism/${outstationId}/`
  );
  return res.data;
}
