import { apiGet, apiPost } from "./client.js";

export async function listEvidence(caseId) {
  return apiGet(`/cases/${caseId}/evidence`);
}

export async function addEvidence(caseId, data) {
  return apiPost(`/cases/${caseId}/evidence`, data);
}
