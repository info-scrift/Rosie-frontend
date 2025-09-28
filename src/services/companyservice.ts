import { getAccessToken } from "@/services/userservice/auth";
import { getApiUrl } from "@/utils/getUrl";
export type CreateOrUpdateJobPayload = {
  title?: string;
  description?: string;
  location?: string;
  employment_type?: "Onsite" | "Hybrid" | "Remote";
  job_type?: "Full-time" | "Part-time" | "Internship" | "Contract";
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  tags?: string[];
  salary_min?: number | null;
  salary_max?: number | null;
  industry?: string | null;
  featured?: boolean;
  urgent?: boolean;
};
export type ListCompanyCandidatesParams = {
  status?: string;
  q?: string;
  jobId?: string;
  limit?: number;
  offset?: number;
};
// small helper
const httpError = (status: number, message: string) => {
  const e: any = new Error(message);
  e.status = status;
  return e;
};

const SKEW_MS = 30_000;
const isExpired = (token: string | null | undefined) => {
  if (!token) return true;
  const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
  const parts = raw.split(".");
  if (parts.length < 2) return false;
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload?.exp === "number" ? Date.now() >= payload.exp * 1000 - SKEW_MS : false;
  } catch {
    return false;
  }
};

async function authedFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getAccessToken?.() ?? null;
  if (!token || isExpired(token)) throw httpError(401, "Token expired");

  const headers = new Headers(init.headers || undefined);
  const bearer = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  headers.set("Authorization", bearer);

  const res = await fetch(input, { ...init, headers, credentials: "include" });
  if (res.status === 401) throw httpError(401, await res.text().catch(() => "Unauthorized"));
  return res;
}

/* ---------- COMPANY ENDPOINTS ---------- */

// GET /api/company/me
export async function getCompanyProfile() {
  const res = await authedFetch(`${getApiUrl()}/company/me`);
  if (!res.ok) throw new Error(`Profile fetch failed: ${res.status}`);
  return res.json(); // { profile }
}

// GET /api/company/dashboard
export async function getCompanyDashboard(params?: { range?: "7d"|"30d"|"90d"|"1y" }) {
  const url = new URL(`${getApiUrl()}/company/dashboard`);
  if (params?.range) url.searchParams.set("range", params.range);
  const res = await authedFetch(url.toString());
  if (!res.ok) throw new Error(`Dashboard fetch failed: ${res.status}`);
  return res.json();
}

// GET /api/company/analytics
export async function getCompanyAnalytics(params?: { range?: "7d"|"30d"|"90d"|"1y" }) {
  const url = new URL(`${getApiUrl()}/company/analytics`);
  if (params?.range) url.searchParams.set("range", params.range);
  const res = await authedFetch(url.toString());
  if (!res.ok) throw new Error(`Analytics fetch failed: ${res.status}`);
  return res.json();
}

// GET /api/company/jobs
export async function listOwnJobs() {
  const res = await authedFetch(`${getApiUrl()}/company/jobs`);
  if (!res.ok) throw new Error(`Jobs fetch failed: ${res.status}`);
  return res.json();
}

// POST /api/company/jobs
export async function createJob(payload: any) {
  const res = await authedFetch(`${getApiUrl()}/company/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text().catch(() => `Create failed: ${res.status}`));
  return res.json(); // { message, job }
}

// GET /api/company/jobs/:id
export async function getOwnJobById(jobId: string) {
  const res = await authedFetch(`${getApiUrl()}/company/jobs/${jobId}`);
  if (!res.ok) throw new Error(`Job fetch failed: ${res.status}`);
  return res.json();
}

// PUT /api/company/jobs/:id
export async function updateJob(jobId: string, payload: any) {
  const res = await authedFetch(`${getApiUrl()}/company/jobs/${jobId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text().catch(() => `Update failed: ${res.status}`));
  return res.json();
}

// DELETE /api/company/jobs/:id
export async function deleteJob(jobId: string) {
  const res = await authedFetch(`${getApiUrl()}/company/jobs/${jobId}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text().catch(() => `Delete failed: ${res.status}`));
  return res.json(); // { message }
}

// GET /api/company/jobs/:id/applications
export async function listJobApplications(jobId: string) {
  const res = await authedFetch(`${getApiUrl()}/company/jobs/${jobId}/applications`);
  if (!res.ok) throw new Error(`Applications fetch failed: ${res.status}`);
  return res.json();
}

// GET /api/company/candidates
export async function listCompanyCandidates(params: ListCompanyCandidatesParams = {}) {
  const url = new URL(`${getApiUrl()}/company/candidates`);
  if (params.status) url.searchParams.set("status", params.status);
  if (params.q) url.searchParams.set("q", params.q);
  if (params.jobId) url.searchParams.set("jobId", params.jobId);
  if (params.limit != null) url.searchParams.set("limit", String(params.limit));
  if (params.offset != null) url.searchParams.set("offset", String(params.offset));

  const res = await authedFetch(url.toString());
  if (!res.ok) throw new Error(`Candidates fetch failed: ${res.status}`);
  return res.json(); // e.g. { rows: [...], total?: number }
}
