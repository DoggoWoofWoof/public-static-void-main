import { apiGet, apiPost } from "./client.js";

export async function listReferrals(caseId) {
  return apiGet(`/cases/${caseId}/referrals`);
}

export async function createReferral(caseId, data) {
  return apiPost(`/cases/${caseId}/referrals`, data);
}
