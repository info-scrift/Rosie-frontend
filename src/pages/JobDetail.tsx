
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, DollarSign, Clock, Bookmark, Share2, ArrowLeft, Users, Calendar, Briefcase, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Mock job data - in real app, this would come from API
  const job = {
    id: jobId,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    industry: "Technology",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    posted: "2 days ago",
    applicants: 34,
    description: "We are looking for a Senior Software Engineer to join our growing team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies like React, Node.js, and cloud platforms.",
    requirements: [
      "5+ years of experience in software development",
      "Strong knowledge of JavaScript, React, and Node.js",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Bachelor's degree in Computer Science or related field",
      "Experience with agile development methodologies",
      "Strong problem-solving and communication skills"
    ],
    responsibilities: [
      "Design and develop scalable web applications",
      "Collaborate with cross-functional teams to define and implement new features",
      "Mentor junior developers and conduct code reviews",
      "Participate in technical discussions and architectural decisions",
      "Optimize application performance and scalability",
      "Stay up-to-date with emerging technologies and industry trends"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements and remote options",
      "Professional development budget ($3,000/year)",
      "Unlimited PTO policy",
      "State-of-the-art equipment and workspace"
    ],
    tags: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    remote: true,
    featured: true,
    urgent: false
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white border-slate-200 shadow-blue-soft hover:shadow-blue-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xl">TC</span>
                        </div>
                        <div>
                          <CardTitle className="text-3xl mb-2 text-slate-900">{job.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-slate-600 mb-2">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.posted}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          <Star className="w-3 h-3 mr-1" />
                          {job.industry}
                        </Badge>
                        <Badge variant="outline" className="border-slate-200 text-slate-700">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {job.type}
                        </Badge>
                        {job.remote && (
                          <Badge variant="outline" className="border-blue-200 text-blue-700">
                            Remote
                          </Badge>
                        )}
                        <div className="flex items-center text-blue-600 font-semibold text-lg">
                          <DollarSign className="w-5 h-5 mr-1" />
                          {job.salary}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-slate-500 text-sm">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                        <Heart className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-slate-900">Job Description</h3>
                      <p className="text-slate-700 leading-relaxed">{job.description}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-slate-900">Key Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-slate-900">Requirements</h3>
                      <ul className="space-y-3">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-slate-900">Responsibilities</h3>
                      <ul className="space-y-3">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-slate-900">Benefits & Perks</h3>
                      <ul className="space-y-3">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white border-slate-200 shadow-blue-soft">
                <CardHeader>
                  <CardTitle className="text-slate-900">Apply for this Job</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/apply" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-blue-soft hover:shadow-blue-glow">
                      Apply Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                    Quick Apply with Resume
                  </Button>
                  <div className="text-center pt-2">
                    <p className="text-sm text-slate-500">
                      Application deadline: December 31, 2024
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white border-slate-200 shadow-blue-soft">
                <CardHeader>
                  <CardTitle className="text-slate-900">Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900">Industry</h4>
                      <p className="text-slate-600">{job.industry}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Company Size</h4>
                      <p className="text-slate-600">500-1000 employees</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Founded</h4>
                      <p className="text-slate-600">2010</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Headquarters</h4>
                      <p className="text-slate-600">San Francisco, CA</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Website</h4>
                      <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                        www.techcorp.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-white border-slate-200 shadow-blue-soft">
                <CardHeader>
                  <CardTitle className="text-slate-900">Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Link to="/jobs/2" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                      <h5 className="font-medium text-slate-900 hover:text-blue-600">Product Manager</h5>
                      <p className="text-sm text-slate-600">Innovation Labs • New York, NY</p>
                      <p className="text-sm text-blue-600 font-medium">$130k - $160k</p>
                    </Link>
                    <Link to="/jobs/3" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                      <h5 className="font-medium text-slate-900 hover:text-blue-600">UX Designer</h5>
                      <p className="text-sm text-slate-600">Design Studio Pro • Austin, TX</p>
                      <p className="text-sm text-blue-600 font-medium">$95k - $125k</p>
                    </Link>
                    <Link to="/jobs/4" className="block p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                      <h5 className="font-medium text-slate-900 hover:text-blue-600">Data Scientist</h5>
                      <p className="text-sm text-slate-600">Analytics Pro • Seattle, WA</p>
                      <p className="text-sm text-blue-600 font-medium">$150k - $190k</p>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
