import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Briefcase,
  Globe,
  Linkedin,
  Calendar,
  FileText,
} from "lucide-react";
import { getApplicantProfile } from "@/services/userservice/applicant";

// ---- Types (optional) ----
type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string | null;
  phone?: string | null;
  address?: string | null;
  skills: string[];
  experience_years: number;
  resume_url?: string | null;
  created_at?: string | null;
  email: string;
  resume_data?: unknown;
  Professional_Bio?: string | null;
  Curent_Job_Title?: string | null;
  Portfolio_link?: string | null;
  Linkedin_Profile?: string | null;
};
type ProfileResponse = { profile: Profile };

// ---- Helpers ----
const formatDate = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const calcAge = (dob?: string | null) => {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
};

// ---- Skeleton Loader (responsive) ----
const LoadingProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 sm:pb-28 my-8 sm:my-10">
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start animate-pulse">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full" />
              <div className="flex-1">
                <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-56 bg-gray-200 rounded mb-3" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-4 w-36 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
            <div className="h-10 w-full sm:w-36 bg-gray-200 rounded" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    </div>
  </div>
);

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data: ProfileResponse = await getApplicantProfile(); // returns { profile }
        setProfile(data.profile);
      } catch (e) {
        console.error("Error fetching profile:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingProfileSkeleton />;

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 sm:pb-28 my-8 sm:my-10">
        <div className="text-center py-16 sm:py-20 text-gray-600">
          No profile found.
          <div className="mt-4">
            <Link to="/profile/edit">
              <Button variant="outline">Create / Edit Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const fullName =
    `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() || "—";
  const jobTitle = profile.Curent_Job_Title || "Software Engineer";
  const age = calcAge(profile.date_of_birth);
  const memberSince = formatDate(profile.created_at);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 sm:pb-28 my-8 sm:my-10">
      <div className="space-y-6">
        {/* Header (responsive) */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl">{fullName}</CardTitle>
                  {/* Contact row stacks on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      <span className="truncate">{profile.email || "—"}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      <span>{profile.phone || "—"}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="truncate">{profile.address || "—"}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        Member since {memberSince}
                        {age ? ` · Age ${age}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Edit buttons (stacked) */}
                  <div className="mt-3 sm:hidden space-y-2">
                    <Link to="/profile/edit" className="block">
                      <Button variant="outline" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>

                    <Link to="/profile/edit-resume" className="block">
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Update Resume
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>

              {/* Desktop Edit buttons (stacked) */}
              <div className="hidden sm:flex sm:flex-col sm:items-end gap-2">
                <Link to="/profile/edit" className="inline-flex">
                  <Button variant="outline" className="bg-blue-50 text-zinc-950">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>

                <Link to="/profile/edit-resume" className="inline-flex">
                  <Button variant="outline" className="bg-blue-50 text-zinc-950">
                    <FileText className="w-4 h-4 mr-2" />
                    Update Resume
                  </Button>
                </Link>
              </div>


            </div>
          </CardHeader>

          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {profile.resume_url ? (
                <span className="inline-flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Resume:{" "}
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline ml-1 break-all"
                  >
                    View
                  </a>
                </span>
              ) : (
                "No resume uploaded yet."
              )}
            </p>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.Professional_Bio ? (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {profile.Professional_Bio}
              </p>
            ) : (
              <div className="text-gray-500">
                No professional bio added yet.
                <Link to="/profile/edit" className="text-blue-600 underline ml-1">
                  Add one now.
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills (wrap nicely on mobile) */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.skills?.length ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No skills added yet.</div>
            )}
          </CardContent>
        </Card>

        {/* Links (stack on mobile, inline on larger) */}
        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <a
                href={profile.Portfolio_link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center px-3 h-10 rounded border text-sm transition w-full sm:w-auto ${profile.Portfolio_link
                  ? "border-blue-200 hover:bg-blue-50 text-blue-700"
                  : "pointer-events-none opacity-60 border-gray-200 text-gray-500"
                  }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                Portfolio
              </a>

              <a
                href={profile.Linkedin_Profile ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center px-3 h-10 rounded border text-sm transition w-full sm:w-auto ${profile.Linkedin_Profile
                  ? "border-blue-200 hover:bg-blue-50 text-blue-700"
                  : "pointer-events-none opacity-60 border-gray-200 text-gray-500"
                  }`}
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Experience summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg text-gray-600 mb-2">
              {jobTitle}{" "}
              {/* {profile.experience_years != null ? `(${profile.experience_years}+ yrs)` : ""} */}
            </p>
            <p className="text-gray-700">
              Total professional experience: {profile.experience_years ?? "—"} years
            </p>

          </CardContent>
        </Card>

        {/* Quick Actions (responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Link to="/profile/applications">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">My Applications</h3>
                <p className="text-sm text-gray-600">View your job applications</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/profile/saved-jobs">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Saved Jobs</h3>
                <p className="text-sm text-gray-600">Jobs you've bookmarked</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/profile/settings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Settings</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </CardContent>
            </Card>
          </Link>
        </div>


      </div>
    </div>
  );
};

export default ProfilePage;
