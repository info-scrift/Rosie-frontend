import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Upload, X, Plus, Save, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies.",
    experience: "8+ years",
    education: "B.S. Computer Science, Stanford University",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe"
  });
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "GraphQL"]);
  const [newSkill, setNewSkill] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  const tabs = [{
    id: "basic",
    label: "Basic Info",
    icon: User
  }, {
    id: "professional",
    label: "Professional",
    icon: Briefcase
  }, {
    id: "skills",
    label: "Skills",
    icon: Award
  }, {
    id: "education",
    label: "Education",
    icon: GraduationCap
  }];
  return <div className="max-w-4xl mx-auto container-padding py-8 space-y-8">
      {/* Header */}
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">
            Edit Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            Update your professional information and preferences
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-soft hover:shadow-blue-glow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Profile Picture Section */}
      <ProfessionalCard variant="executive">
        <CardContent className="p-8">
          <div className="flex items-center space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-4xl">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Upload className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-black">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-lg text-muted-foreground mb-4">{profileData.title}</p>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Photo
              </Button>
            </div>
          </div>
        </CardContent>
      </ProfessionalCard>

      {/* Navigation Tabs */}
      <ProfessionalCard variant="executive">
        <CardContent className="p-0">
          <div className="flex border-b">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-6 py-4 font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900"}`}>
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>)}
          </div>
        </CardContent>
      </ProfessionalCard>

      {/* Tab Content */}
      <ProfessionalCard variant="executive">
        <CardContent className="p-8">
          {activeTab === "basic" && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-600 font-medium">First Name</Label>
                  <Input id="firstName" value={profileData.firstName} onChange={e => handleInputChange("firstName", e.target.value)} className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-600 font-medium">Last Name</Label>
                  <Input id="lastName" value={profileData.lastName} onChange={e => handleInputChange("lastName", e.target.value)} className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-600 font-medium">Email Address</Label>
                <Input id="email" type="email" value={profileData.email} onChange={e => handleInputChange("email", e.target.value)} className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-600 font-medium">Phone Number</Label>
                  <Input id="phone" value={profileData.phone} onChange={e => handleInputChange("phone", e.target.value)} className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-600 font-medium">Location</Label>
                  <Input id="location" value={profileData.location} onChange={e => handleInputChange("location", e.target.value)} className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-600 font-medium">Professional Bio</Label>
                <Textarea id="bio" value={profileData.bio} onChange={e => handleInputChange("bio", e.target.value)} className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500 min-h-24" placeholder="Tell us about your professional background and goals..." />
              </div>
            </motion.div>}

          {activeTab === "professional" && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-600 font-medium">Current Job Title</Label>
                <Input id="title" value={profileData.title} onChange={e => handleInputChange("title", e.target.value)} className="professional-form-input" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-600 font-medium">Current Company</Label>
                <Input id="company" value={profileData.company} onChange={e => handleInputChange("company", e.target.value)} className="professional-form-input" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-slate-600 font-medium">Years of Experience</Label>
                <Select value={profileData.experience} onValueChange={value => handleInputChange("experience", value)}>
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
                  <Label htmlFor="website" className="text-slate-600 font-medium">Website/Portfolio</Label>
                  <Input id="website" value={profileData.website} onChange={e => handleInputChange("website", e.target.value)} className="professional-form-input" placeholder="https://yourwebsite.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-slate-600 font-medium">LinkedIn Profile</Label>
                  <Input id="linkedin" value={profileData.linkedin} onChange={e => handleInputChange("linkedin", e.target.value)} className="professional-form-input" placeholder="https://linkedin.com/in/yourprofile" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="text-slate-600 font-medium">GitHub Profile</Label>
                <Input id="github" value={profileData.github} onChange={e => handleInputChange("github", e.target.value)} className="professional-form-input" placeholder="https://github.com/yourusername" />
              </div>
            </motion.div>}

          {activeTab === "skills" && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-slate-600 font-medium">Technical Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => <Badge key={skill} variant="secondary" className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
                      <span>{skill}</span>
                      <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>)}
                </div>
                <div className="flex items-center space-x-2">
                  <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add a skill..." className="flex-1 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500" onKeyPress={e => e.key === "Enter" && addSkill()} />
                  <Button onClick={addSkill} variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-slate-600 font-medium">Certifications</Label>
                <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </motion.div>}

          {activeTab === "education" && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="education" className="text-slate-600 font-medium">Education</Label>
                <Input id="education" value={profileData.education} onChange={e => handleInputChange("education", e.target.value)} className="professional-form-input" placeholder="e.g., B.S. Computer Science, Stanford University" />
              </div>

              <div className="space-y-4">
                <Label className="text-slate-600 font-medium">Additional Education</Label>
                <Button variant="outline" className="executive-button-secondary w-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
            </motion.div>}
        </CardContent>
      </ProfessionalCard>

      {/* Save Actions */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="lg" className="px-8 bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Cancel
        </Button>
        <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-blue-soft hover:shadow-blue-glow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>;
};
export default EditProfile;