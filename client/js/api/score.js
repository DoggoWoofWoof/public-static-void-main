import { apiGet, apiPost } from "./client.js";

export async function getLatestScore(caseId) {
  return apiGet(`/cases/${caseId}/score/latest`);
}

export async function recomputeScore(caseId) {
  return apiPost(`/cases/${caseId}/score/recompute`, {});
}
