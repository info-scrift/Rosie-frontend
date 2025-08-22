// services/userservice/applicant.ts
import { getAccessToken } from "@/services/userservice/auth";
import { getApiUrl } from "@/utils/getUrl";
export async function getApplicantProfile() {

  const token = getAccessToken();
  const res = await fetch(`${getApiUrl()}/applicant/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    credentials: "include", // optional—remove if you don’t use cookies
  });
  console.log(res)
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Profile fetch failed: ${res.status} ${text}`);
  }
  return res.json(); // shape depends on your backend
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