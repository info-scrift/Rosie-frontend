// services/jobService.ts
import { getApiUrl } from "@/utils/getUrl";

export type Job = {
  id: string;
  company_id: string;
  title: string;
  description: string;
  requirements: string[] | null;
  location: string | null;
  employment_type: "Onsite" | "Hybrid" | "Remote";
  salary_min: number | null;
  salary_max: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  industry: string | null;
  posted_at: string | null;
  tags: string[] | null;
  responsibilities: string[] | null;
  benefits: string[] | null;
  remote: boolean;
  featured: boolean;
  urgent: boolean;
  job_type: "Full-time" | "Part-time" | "Contract" | "Internship";
};

export async function getPublicJobs(page = 1): Promise<Job[]> {
  const res = await fetch(`${getApiUrl()}/jobs?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Jobs fetch failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function getPublicJob(id: string): Promise<Job> {
    const res = await fetch(`${getApiUrl()}/jobs/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Job fetch failed: ${res.status} ${text}`);
    }
    return res.json();
  }