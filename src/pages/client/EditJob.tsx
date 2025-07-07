
import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MapPin, DollarSign, Briefcase, Clock, Users, Save, Eye, Trash2, Archive } from "lucide-react";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { AnimatedCard } from "@/components/ui/animated-card";

const EditJob = () => {
  const { jobId } = useParams();
  const [isActive, setIsActive] = useState(true);
  const [skills] = useState(["React", "TypeScript", "Node.js", "GraphQL"]);

  // Mock job data
  const jobData = {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salaryMin: "120000",
    salaryMax: "180000",
    experience: "senior",
    summary: "We're looking for a talented Senior Software Engineer to join our growing team and help build the next generation of our platform.",
    responsibilities: "• Lead development of new features\n• Mentor junior developers\n• Collaborate with cross-functional teams\n• Drive technical architecture decisions",
    requirements: "5+ years of software development experience with modern web technologies.",
    posted: "5 days ago",
    applications: 23,
    views: 342
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <FadeInSection>
        <div className="flex justify-between items-start mb-8">
          <div>
            <motion.h1 
              className="text-4xl font-display font-bold text-gradient mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Edit Job Posting
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={ { delay: 0.2, duration: 0.5 }}
            >
              Job ID: {jobId} • Posted {jobData.posted} • {jobData.applications} applications
            </motion.p>
          </div>
          
          <div className="flex space-x-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button variant="outline" className="hover:shadow-md transition-all duration-200">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button className="bg-gradient-primary hover:shadow-lg transition-all duration-300">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </motion.div>
          </div>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <FadeInSection delay={0.2}>
            <AnimatedCard className="card-hover">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardTitle className="font-display flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      defaultValue={jobData.title}
                      className="focus-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue={jobData.department.toLowerCase()}>
                      <SelectTrigger className="focus-ring">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location *
                    </Label>
                    <Input
                      id="location"
                      defaultValue={jobData.location}
                      className="focus-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Employment Type *
                    </Label>
                    <Select defaultValue="full-time">
                      <SelectTrigger className="focus-ring">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Job Summary *</Label>
                  <Textarea
                    id="summary"
                    defaultValue={jobData.summary}
                    className="min-h-[100px] focus-ring"
                  />
                </div>
              </CardContent>
            </AnimatedCard>
          </FadeInSection>

          {/* Job Details */}
          <FadeInSection delay={0.4}>
            <AnimatedCard className="card-hover">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardTitle className="font-display flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Compensation & Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">Min Salary</Label>
                    <Input
                      id="salary-min"
                      defaultValue={jobData.salaryMin}
                      className="focus-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary-max">Max Salary</Label>
                    <Input
                      id="salary-max"
                      defaultValue={jobData.salaryMax}
                      className="focus-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select defaultValue={jobData.experience}>
                      <SelectTrigger className="focus-ring">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead/Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Required Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Key Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    defaultValue={jobData.responsibilities}
                    className="min-h-[120px] focus-ring"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    defaultValue={jobData.requirements}
                    className="min-h-[80px] focus-ring"
                  />
                </div>
              </CardContent>
            </AnimatedCard>
          </FadeInSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Status */}
          <FadeInSection delay={0.6}>
            <AnimatedCard className="card-hover">
              <CardHeader>
                <CardTitle className="font-display text-lg">Job Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="active-toggle">Active Posting</Label>
                  <Switch
                    id="active-toggle"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Views</span>
                    <span className="font-medium">{jobData.views}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applications</span>
                    <span className="font-medium">{jobData.applications}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium">{jobData.posted}</span>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </FadeInSection>

          {/* Quick Actions */}
          <FadeInSection delay={0.8}>
            <AnimatedCard className="card-hover">
              <CardHeader>
                <CardTitle className="font-display text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:shadow-md transition-all duration-200"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Applications
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:shadow-md transition-all duration-200"
                >
                  <Archive className="w-4 h-4 mr-2" />
                  Archive Job
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Job
                </Button>
              </CardContent>
            </AnimatedCard>
          </FadeInSection>

          {/* Performance Metrics */}
          <FadeInSection delay={1.0}>
            <AnimatedCard className="card-hover">
              <CardHeader>
                <CardTitle className="font-display text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Application Rate</span>
                      <span>6.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '67%' }}
                        transition={{ delay: 1.2, duration: 1 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quality Score</span>
                      <span>8.4/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-green-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '84%' }}
                        transition={{ delay: 1.4, duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 text-xs text-muted-foreground">
                  <p>Your job is performing well! Consider promoting it for even better reach.</p>
                </div>
              </CardContent>
            </AnimatedCard>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
