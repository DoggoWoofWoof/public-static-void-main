import { apiGet } from "./client.js";

export async function listAnnouncements(caseId) {
  return apiGet(`/cases/${caseId}/announcements`);
}
