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

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Profile fetch failed: ${res.status} ${text}`);
  }
  return res.json(); // shape depends on your backend
}
