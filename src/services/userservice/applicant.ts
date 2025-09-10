// services/userservice/applicant.ts
import { getAccessToken } from "@/services/userservice/auth";
import { getApiUrl } from "@/utils/getUrl";

// services/userservice/applicant.ts

import type { EnsureApplicantProfileResp, GetApplicantProfileResp, ApplicantProfile } from '@/types/applicanttype' ;


export async function ensureApplicantProfile(): Promise<EnsureApplicantProfileResp> {
  const token = getAccessToken();
  const res = await authedFetch(`${getApiUrl()}/applicant/profile/ensure`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token ?? ""}` },
    credentials: "include",
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(t || `Ensure request failed (${res.status})`);
  }
  const data = await res.json();
  if (typeof data?.exists === "boolean") return data;
  // legacy normalize
  return { exists: !!data?.profile, profile: data?.profile ?? null, seed: undefined };
}



// services/userservice/applicant.ts
export async function getApplicantProfile(): Promise<{ profile: any | null }> {
  const token = getAccessToken();
  const res = await authedFetch(`${getApiUrl()}/applicant/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    credentials: "include",
  });

  // Gracefully interpret 404 as "no profile yet"
  if (res.status === 404) {
    return { profile: null };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Profile fetch failed: ${res.status} ${text}`);
  }
  return res.json(); // { profile } | { profile: null }
}

export async function updateApplicantProfileApi(payload: {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  Professional_Bio?: string | null;
  Curent_Job_Title?: string | null;
  Portfolio_link?: string | null;
  Linkedin_Profile?: string | null;
  skills?: string[];
  experience_years?: number | null;
}) {
  const token = getAccessToken();

  const res = await authedFetch(`${getApiUrl()}/applicant/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Update failed: ${res.status} ${text}`);
  }
  return res.json(); // { message, profile }
}

export async function deleteApplicantProfileApi(): Promise<void> {
  const token = getAccessToken();
  const res = await authedFetch(`${getApiUrl()}/applicant/profile`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Delete failed: ${res.status} ${text}`);
  }
}

// Call POST /api/applicant/profile/change-password
export async function changeApplicantPassword(payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ message: string }> {
  const token = getAccessToken();
  const res = await authedFetch(`${getApiUrl()}/applicant/profile/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Change password failed: ${res.status} ${text}`);
  }
  return res.json();
}
export type UploadApplicantResumeResponse = {
  message: string;
  resume_url: string;
  profile?: any;
};

export async function uploadApplicantResume(file: File): Promise<UploadApplicantResumeResponse> {
  const token = getAccessToken();
  const form = new FormData();
  form.append("resume", file); // <-- must be "resume"

  // Optional client guards (mirror backend)
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) throw new Error("Please upload a PDF.");
  if (file.size > 10 * 1024 * 1024) throw new Error("PDF must be ≤ 10MB.");

  const res = await authedFetch(`${getApiUrl()}/applicant/profile/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ?? ""}`, // do NOT set Content-Type for FormData
    },
    body: form,
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resume upload failed: ${res.status} ${text}`);
  }
  return res.json();
}

export type UploadApplicantPhotoResponse = {
  message: string;
  photo_url: string;
  profile?: any;
};

export async function uploadApplicantPhoto(file: File): Promise<UploadApplicantPhotoResponse> {
  const token = getAccessToken();
  const form = new FormData();
  form.append("photo", file); // field name MUST be "photo"

  // Client-side guards (mirror backend)
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) throw new Error("Only JPEG, PNG, or WEBP images are allowed.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Photo exceeds 5MB limit.");

  const res = await authedFetch(`${getApiUrl()}/applicant/profile/photo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ?? ""}`, // do NOT set Content-Type with FormData
    },
    body: form,
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Photo upload failed: ${res.status} ${text}`);
  }
  return res.json();
}
// --- add below your imports in services/userservice/applicant.ts ---

// tiny helper to tag errors with an HTTP status
const httpError = (status: number, message: string) => {
  const e: any = new Error(message);
  e.status = status;
  return e;
};

const SKEW_MS = 30_000; // 30s clock skew tolerance

/** Extract exp (ms) from a JWT (handles url-safe base64). */
function getExpMsFromJwt(token: string | null | undefined): number | null {
  if (!token) return null;
  const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
  const parts = raw.split(".");
  if (parts.length < 2) return null;
  try {
    const payloadB64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(payloadB64));
    return typeof json?.exp === "number" ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

/** Local check to decide if the token is already expired (with skew). */
export function isTokenExpiredLocal(token: string | null | undefined): boolean {
  const expMs = getExpMsFromJwt(token);
  return expMs ? Date.now() >= (expMs - SKEW_MS) : false;
}

/** One place to add Authorization, throw 401 on expired token, keep FormData safe. */
async function authedFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getAccessToken?.() ?? null;

  // Proactive local expiry check so FE behaves consistently across pages.
  if (!token || isTokenExpiredLocal(token)) {
    throw httpError(401, "Token expired");
  }

  // Merge headers without forcing Content-Type (so FormData works)
  const headers = new Headers(init.headers || undefined);
  const bearer = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  headers.set("Authorization", bearer);

  const res = await fetch(input, {
    ...init,
    headers,
    credentials: "include",
  });

  if (res.status === 401) {
    // Normalize to a thrown error with .status=401
    const text = await res.text().catch(() => "");
    throw httpError(401, text || "Unauthorized");
  }

  return res;
}

// services/userservice/applicant.ts
export async function createApplicantProfileApi(payload: {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  Professional_Bio?: string | null;
  Curent_Job_Title?: string | null;
  Portfolio_link?: string | null;
  Linkedin_Profile?: string | null;
  skills?: string[];
  experience_years?: number | null;
  email?: string; // optional
}) {
  const token = getAccessToken();
  const res = await authedFetch(`${getApiUrl()}/applicant/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Create failed: ${res.status} ${text}`);
  }
  return res.json(); // { message, profile }
}
