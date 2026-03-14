/**
 * BorderBridge API client
 * All requests include X-Demo-Username for the FastAPI demo-auth middleware.
 * Backend runs on http://127.0.0.1:8000
 */

const BASE_URL = "http://127.0.0.1:8000";
const DEFAULT_USER = "auth_manager";

async function request<T>(
  path: string,
  options: RequestInit = {},
  user: string = DEFAULT_USER
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Demo-Username": user,
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Cases ─────────────────────────────────────────────────────────────────────
export function listCases(params?: { status?: string; search?: string }) {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.search) qs.set("search", params.search);
  const q = qs.toString();
  return request<Record<string, unknown>[]>(`/cases${q ? `?${q}` : ""}`);
}

export function getCase(caseId: string) {
  return request<Record<string, unknown>>(`/cases/${caseId}`);
}

/** Create a new case. POST /cases body: { person_id, intake_location, owner_agency } */
export function createCase(body: {
  person_id?: string;
  person?: {
    primary_name?: string;
    name?: string;
    nationality?: string;
    language?: string;
    date_of_birth?: string;
  };
  status?: string;
  intake_location?: string;
  owner_agency?: string;
}) {
  return request<Record<string, unknown>>("/cases", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function getCaseTimeline(caseId: string) {
  return request<Record<string, unknown>[]>(`/cases/${caseId}/timeline`);
}

// ── Evidence ──────────────────────────────────────────────────────────────────
export function listEvidence(caseId: string) {
  return request<Record<string, unknown>[]>(`/cases/${caseId}/evidence`);
}

export function addEvidence(
  caseId: string,
  body: {
    case_id: string;
    person_id: string;
    evidence_class: string;
    evidence_type: string;
    payload: Record<string, unknown>;
  }
) {
  return request<Record<string, unknown>>(`/cases/${caseId}/evidence`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function reviewEvidence(
  evidenceId: string,
  state: "accepted" | "rejected" | "disputed"
) {
  return request<Record<string, unknown>>(`/evidence/${evidenceId}/review`, {
    method: "PATCH",
    body: JSON.stringify({ state }),
  });
}

// ── Scoring ──────────────────────────────────────────────────────────────────
export function getLatestScore(caseId: string) {
  return request<Record<string, unknown> | null>(`/cases/${caseId}/score/latest`);
}

export function recomputeScore(caseId: string) {
  return request<Record<string, unknown>>(`/cases/${caseId}/score/recompute`, {
    method: "POST",
  });
}

// ── Referrals ────────────────────────────────────────────────────────────────
export function createReferral(
  caseId: string,
  body: {
    case_id: string;
    referral_type: string;
    from_agency?: string;
    to_agency?: string;
    reason?: string;
  }
) {
  return request<Record<string, unknown>>(`/cases/${caseId}/referrals`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateReferral(
  referralId: string,
  status: string
) {
  return request<Record<string, unknown>>(`/referrals/${referralId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// ── Announcements ─────────────────────────────────────────────────────────────
export function listAnnouncements(caseId: string) {
  return request<Record<string, unknown>[]>(`/cases/${caseId}/announcements`);
}

export function createAnnouncement(body: Record<string, unknown>) {
  return request<Record<string, unknown>>("/announcements", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ── Health ────────────────────────────────────────────────────────────────────
export function healthCheck() {
  return request<{ status: string }>("/health");
}
