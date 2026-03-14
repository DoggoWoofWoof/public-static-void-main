import { getSession, type UserRole } from "./auth";

const BASE_URL = "http://127.0.0.1:8000";
const DEFAULT_USER = "auth_manager";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const session = getSession();
  const headers = new Headers(options.headers ?? {});

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  } else {
    headers.set("X-Demo-Username", DEFAULT_USER);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export function login(body: { role: UserRole; username: string; password: string }) {
  return request<{
    access_token: string;
    token_type: string;
    role: UserRole;
    username: string;
    display_name?: string | null;
    case_id?: string | null;
    redirect_to: string;
  }>("/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

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

export function reviewEvidence(evidenceId: string, state: "accepted" | "rejected" | "disputed") {
  return request<Record<string, unknown>>(`/evidence/${evidenceId}/review`, {
    method: "PATCH",
    body: JSON.stringify({ state }),
  });
}

export function getLatestScore(caseId: string) {
  return request<Record<string, unknown> | null>(`/cases/${caseId}/score/latest`);
}

export function recomputeScore(caseId: string) {
  return request<Record<string, unknown>>(`/cases/${caseId}/score/recompute`, {
    method: "POST",
  });
}

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

export function updateReferral(referralId: string, status: string) {
  return request<Record<string, unknown>>(`/referrals/${referralId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function listAnnouncements(caseId: string) {
  return request<Record<string, unknown>[]>(`/cases/${caseId}/announcements`);
}

export function createAnnouncement(body: Record<string, unknown>) {
  return request<Record<string, unknown>>("/announcements", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function healthCheck() {
  return request<{ status: string }>("/health");
}
