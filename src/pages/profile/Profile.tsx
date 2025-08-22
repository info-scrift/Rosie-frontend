import { useEffect, useState, useRef } from "react";
import { uploadApplicantPhoto } from "@/services/userservice/applicant";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadApplicantResume } from "@/services/userservice/applicant";
import { Upload } from "lucide-react";
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
  Camera,
  FileText as FileTextIcon,
} from "lucide-react";
import { getApplicantProfile } from "@/services/userservice/applicant";
import { SweetAlert } from "@/components/ui/SweetAlert";
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
  photo_url?: string | null;
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
  const [uploadingResume, setUploadingResume] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    title: string;
    message?: string;
    variant?: "success" | "error" | "info" | "warning";
  }>({ open: false, title: "", message: "", variant: "info" });
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [photoVersion, setPhotoVersion] = useState(0); // bump to force reload after upload
  const [imgError, setImgError] = useState(false);     // show fallback if image fails

  const openPhotoPicker = () => photoInputRef.current?.click();
  
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingPhoto(true);
      const resp = await uploadApplicantPhoto(file);
      // Update local profile to reflect the new avatar immediately
      setProfile(prev => (prev ? { ...prev, photo_url: resp.photo_url } : prev));
      setPhotoVersion(v => v + 1);   // <— forces <img> to reload with a new query param
      setImgError(false);            // <— try to render image again
      setAlert({ open: true, title: "Photo updated", message: "Your profile photo was uploaded successfully.", variant: "success" });
    } catch (err: any) {
      console.error(err);
      setAlert({ open: true, title: "Photo upload failed", message: err?.message || "Something went wrong while uploading your photo.", variant: "error" });
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

  const closeAlert = () => setAlert(a => ({ ...a, open: false }));

  const resumeInputRef = useRef<HTMLInputElement>(null);

  const openResumePicker = () => resumeInputRef.current?.click();

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingResume(true);
      const resp = await uploadApplicantResume(file);
      // update local profile to refresh the "View" link
      setProfile((prev) => (prev ? { ...prev, resume_url: resp.resume_url } : prev));
      setAlert({
        open: true,
        title: "Resume updated",
        message: "Your resume was uploaded successfully.",
        variant: "success",
      });

    } catch (err: any) {
      console.error(err);
      setAlert({
        open: true,
        title: "Resume upload failed",
        message: err?.message || "Something went wrong while uploading your resume.",
        variant: "error",
      });

    } finally {
      setUploadingResume(false);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    }
  };


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
// Safe to read because we know `profile` exists here
const basePhoto = profile.photo_url ?? null;
const imgSrc = basePhoto
  ? `${basePhoto}${basePhoto.includes("?") ? "&" : "?"}v=${photoVersion}`
  : null;

  const fullName =
    `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() || "—";
  const jobTitle = profile.Curent_Job_Title || "Software Engineer";
  const age = calcAge(profile.date_of_birth);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 sm:pb-28 my-8 sm:my-10">
      <div className="space-y-6">
        {/* Header (responsive) */}
        <input
          ref={resumeInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleResumeChange}
        />
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-blue-600 ring-2 ring-white group">
                  {imgSrc && !imgError ? (
                    <img
                      key={photoVersion}                // re-mount on version change
                      src={imgSrc}
                      alt={fullName}
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)} // show fallback if 403/404/etc
                      crossOrigin="anonymous"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  )}

                  {/* Camera overlay */}
                  <button
                    type="button"
                    onClick={openPhotoPicker}
                    disabled={uploadingPhoto}
                    aria-label="Update profile photo"
                    title="Update profile photo"
                    className="absolute bottom-0 right-0 m-0.5 sm:m-1 rounded-full bg-white/95 border border-slate-200 p-1.5
               hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
               disabled:opacity-60 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className={`w-3.5 h-3.5 ${uploadingPhoto ? "animate-pulse" : ""}`} />
                  </button>
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

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={openResumePicker}
                      disabled={uploadingResume}
                    >
                      {uploadingResume ? (
                        <>
                          <Upload className="w-4 h-4 mr-2 animate-pulse" />
                          Uploading…
                        </>
                      ) : (
                        <>
                          <FileTextIcon className="w-4 h-4 mr-2" />
                          Update Resume
                        </>
                      )}
                    </Button>
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

                <Button
                  variant="outline"
                  className="bg-blue-50 text-zinc-950"
                  onClick={openResumePicker}
                  disabled={uploadingResume}
                >
                  {uploadingResume ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-pulse" />
                      Uploading…
                    </>
                  ) : (
                    <>
                      <FileTextIcon className="w-4 h-4 mr-2" />
                      Update Resume
                    </>
                  )}
                </Button>
              </div>


            </div>
          </CardHeader>

          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {profile.resume_url ? (
                <span className="inline-flex items-center">
                  <FileTextIcon className="w-4 h-4 mr-2" />
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
        {/* sweet alert for resume*/}
        <SweetAlert
          open={alert.open}
          title={alert.title}
          message={alert.message}
          variant={alert.variant}
          confirmText="OK"
          onConfirm={closeAlert}
          onClose={closeAlert}
        />


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
