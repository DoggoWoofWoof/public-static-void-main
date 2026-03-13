import { apiGet, apiPost } from "./client.js";

export async function listCases(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiGet(`/cases${query ? "?" + query : ""}`);
}

export async function getCase(caseId) {
  return apiGet(`/cases/${caseId}`);
}

export async function createCase(data) {
  return apiPost("/cases", data);
}
