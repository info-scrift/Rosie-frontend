// services/userservice/applicant.ts
import { getAccessToken } from "@/services/userservice/auth";
import { getApiUrl } from "@/utils/getUrl";
import type { ApplicantProfile } from "@/types/applicanttype";
export async function ensureApplicantProfile(): Promise<{ profile: ApplicantProfile }> {
  const token = getAccessToken();
  const res = await fetch(`${getApiUrl()}/applicant/profile/ensure`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
    credentials: "include",
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Failed to ensure profile: ${res.status}`);
  }
  return res.json();
}
// services/userservice/applicant.ts
export async function getApplicantProfile(): Promise<{ profile: any | null }> {
  const token = getAccessToken();
  const res = await fetch(`${getApiUrl()}/applicant/profile`, {
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

  const res = await fetch(`${getApiUrl()}/applicant/profile`, {
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
  const res = await fetch(`${getApiUrl()}/applicant/profile`, {
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
  const res = await fetch(`${getApiUrl()}/applicant/profile/change-password`, {
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

  const res = await fetch(`${getApiUrl()}/applicant/profile/upload`, {
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

  const res = await fetch(`${getApiUrl()}/applicant/profile/photo`, {
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

