import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { updateApplicantProfileApi } from "@/services/userservice/applicant";
import { SweetAlert } from "@/components/ui/SweetAlert";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Upload,
  X,
  Plus,
  Save,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApplicantProfile, uploadApplicantPhoto } from "@/services/userservice/applicant";


// ---- helpers ----
const mapExperienceYearsToLabel = (n?: number | null): string => {
  if (n == null) return "";
  if (n >= 10) return "10+ years";
  if (n >= 8) return "8+ years";
  if (n >= 6) return "6-7 years";
  if (n >= 4) return "4-5 years";
  if (n >= 2) return "2-3 years";
  return "0-1 years";
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    company: "TechCorp Solutions", // not provided by API; remains local
    bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies.",
    experience: "8+ years", // mapped from experience_years
    education: "B.S. Computer Science, Stanford University", // not provided by API; remains local
    website: "https://johndoe.dev", // maps from Portfolio_link
    linkedin: "https://linkedin.com/in/johndoe", // maps from Linkedin_Profile
    github: "https://github.com/johndoe", // not provided by API; remains local
  });
  // photo state for edit page
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoVersion, setPhotoVersion] = useState(0); // bust cache after upload
  const [imgError, setImgError] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const openPhotoPicker = () => photoInputRef.current?.click();
  const [alert, setAlert] = useState<{
    open: boolean;
    title: string;
    message?: string;
    variant?: "success" | "error" | "info" | "warning";
  }>({ open: false, title: "", message: "", variant: "info" });
  const closeAlert = () => setAlert((a) => ({ ...a, open: false }));

  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "PostgreSQL",
    "GraphQL",
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingPhoto(true);
      const resp = await uploadApplicantPhoto(file);
      setPhotoUrl(resp.photo_url || null);
      setPhotoVersion((v) => v + 1); // cache-bust the <img> src
      setImgError(false);
      setAlert({
        open: true,
        title: "Photo updated",
        message: "Your profile photo was uploaded successfully.",
        variant: "success",
      });
    } catch (err) {
      console.error("Photo upload failed:", err);
      // optional: plug in your SweetAlert here if you use it on this page
      setAlert({
        open: true,
        title: "Photo upload failed",
        message: err?.message || "Something went wrong while uploading your photo.",
        variant: "error",
      });
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // ---- fetch & map data from API ----
  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getApplicantProfile(); // expected: { profile: {...} }
      const p = data?.profile;

      if (!p) {
        setError("Profile not found.");
        setLoading(false);
        return;
      }
      setPhotoUrl(p.photo_url ?? null);
      setPhotoVersion((v) => v + 1); // force a fresh render when page opens
      setImgError(false);

      setProfileData({
        firstName: p.first_name ?? "",
        lastName: p.last_name ?? "",
        email: p.email ?? "",
        phone: p.phone ?? "",
        location: p.address ?? "",
        title: p.Curent_Job_Title ?? "", // API uses 'Curent_Job_Title'
        company: "", // not in API
        bio: p.Professional_Bio ?? "",
        experience: mapExperienceYearsToLabel(p.experience_years),
        education: "", // not in API
        website: p.Portfolio_link ?? "",
        linkedin: p.Linkedin_Profile ?? "",
        github: "", // not in API
      });

      if (Array.isArray(p.skills)) {
        setSkills(p.skills);
      } else {
        setSkills([]);
      }
    } catch (e: any) {
      console.error("Error fetching profile:", e);
      setError(
        typeof e?.message === "string"
          ? e.message
          : "Failed to load profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Award },
    // { id: "education", label: "Education", icon: GraduationCap },
  ];

  // ---- loading state (no UI layout changes) ----
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto container-padding py-8 space-y-8">
        <div className="text-center py-10">Loading profile...</div>
      </div>
    );
  }

  // ---- error state (no UI layout changes) ----
  if (error) {
    return (
      <div className="max-w-4xl mx-auto container-padding py-8 space-y-8">
        <div className="text-center py-10">
          <div className="mb-4 text-red-600">{error}</div>
          <Button variant="outline" onClick={loadProfile}>
            Retry
          </Button>
        </div>
      </div>
    );
  }
  const mapExperienceLabelToYears = (label?: string): number | null => {
    switch ((label || "").trim()) {
      case "10+ years": return 10;
      case "8+ years": return 8;
      case "6-7 years": return 6;
      case "4-5 years": return 4;
      case "2-3 years": return 2;
      case "0-1 years": return 0;
      default: return null;
    }
  };

  const handleSaveAllChanges = async () => {
    try {
      const payload = {
        first_name: profileData.firstName || "",
        last_name: profileData.lastName || "",
        email: profileData.email || "",          // include only if you allow editing email
        phone: profileData.phone || "",
        address: profileData.location || "",
        Professional_Bio: profileData.bio || null,
        Curent_Job_Title: profileData.title || null,
        Portfolio_link: profileData.website || null,
        Linkedin_Profile: profileData.linkedin || null,
        skills: skills ?? [],
        experience_years: mapExperienceLabelToYears(profileData.experience),
      };

      await updateApplicantProfileApi(payload);

      // optional: success toast / SweetAlert
      // You can reuse your SweetAlert if you add it to this page too
      setAlert({
        open: true,
        title: "Profile updated",
        message: "Your changes have been saved successfully.",
        variant: "success",
      });
    } catch (e: any) {
      console.error(e);
      setAlert({
        open: true,
        title: "Update failed",
        message: typeof e?.message === "string" ? e.message : "Failed to update profile.",
        variant: "error",
      });
    }
  };



  return (

    <div className="max-w-4xl mx-auto container-padding py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center my-10"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">
            Edit Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            Update your professional information and preferences
          </p>
        </div>
        <div className="flex items-center space-x-3">

        </div>
      </motion.div>
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
      />
      {/* Global SweetAlert for this page */}
      <SweetAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        variant={alert.variant}
        confirmText="OK"
        onConfirm={closeAlert}
        onClose={closeAlert}
      />

      {/* Profile Picture Section */}
      <ProfessionalCard variant="executive">
        <CardContent className="p-8">
          <div className="flex items-center space-x-8">
            
            <div className="w-32 h-32 rounded-full overflow-hidden bg-blue-100 ring-2 ring-white">
              {photoUrl && !imgError ? (
                <img
                  key={photoVersion}                 // re-mount on version change
                  src={`${photoUrl}${photoUrl.includes("?") ? "&" : "?"}v=${photoVersion}`}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                  crossOrigin="anonymous"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-4xl">
                    {profileData.firstName?.[0] ?? ""}
                    {profileData.lastName?.[0] ?? ""}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-black">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                {profileData.title}
              </p>
              
              <Button
                type="button"
                variant="outline"
                onClick={openPhotoPicker}
                disabled={uploadingPhoto}
                className="bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
              >
                <Upload className={`w-4 h-4 mr-2 ${uploadingPhoto ? "animate-pulse" : ""}`} />
                {uploadingPhoto ? "Uploading…" : "Upload New Photo"}
              </Button>

            </div>
          </div>
        </CardContent>
      </ProfessionalCard>

      {/* Navigation Tabs */}
      <ProfessionalCard variant="executive">
        <CardContent className="p-0">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </ProfessionalCard>

      {/* Tab Content */}
      <ProfessionalCard variant="executive">
        <CardContent className="p-8">
          {activeTab === "basic" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-600 font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-600 font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-600 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-600 font-medium">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-600 font-medium">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-24"
                  placeholder="Tell us about your professional background and goals..."
                />
              </div>
            </motion.div>
          )}

          {activeTab === "professional" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-600 font-medium">
                  Current Job Title
                </Label>
                <Input
                  id="title"
                  value={profileData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="professional-form-input"
                />
              </div>



              <div className="space-y-2">
                <Label htmlFor="experience" className="text-slate-600 font-medium">
                  Years of Experience
                </Label>
                <Select
                  value={profileData.experience}
                  onValueChange={(value) => handleInputChange("experience", value)}
                >
                  <SelectTrigger className="professional-form-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1 years">0-1 years</SelectItem>
                    <SelectItem value="2-3 years">2-3 years</SelectItem>
                    <SelectItem value="4-5 years">4-5 years</SelectItem>
                    <SelectItem value="6-7 years">6-7 years</SelectItem>
                    <SelectItem value="8+ years">8+ years</SelectItem>
                    <SelectItem value="10+ years">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-slate-600 font-medium">
                    Website/Portfolio
                  </Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="professional-form-input"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-slate-600 font-medium">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className="professional-form-input"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="text-slate-600 font-medium">
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  value={profileData.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  className="professional-form-input"
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-slate-600 font-medium">Technical Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 border-blue-200"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    className="flex-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button
                    onClick={addSkill}
                    variant="outline"
                    className="bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-slate-600 font-medium">Certifications</Label>
                <Button
                  variant="outline"
                  className="w-full bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="education" className="text-slate-600 font-medium">
                  Education
                </Label>
                <Input
                  id="education"
                  value={profileData.education}
                  onChange={(e) => handleInputChange("education", e.target.value)}
                  className="professional-form-input"
                  placeholder="e.g., B.S. Computer Science, Stanford University"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-slate-600 font-medium">Additional Education</Label>
                <Button className="executive-button-secondary w-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </ProfessionalCard>

      {/* Save Actions */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate("/profile")}
          className="px-8 bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-blue-soft hover:shadow-blue-glow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSaveAllChanges}
        >
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>

      </div>
    </div>
  );
};

export default EditProfile;
