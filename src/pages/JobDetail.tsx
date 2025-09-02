
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, DollarSign, Clock, Bookmark, Share2, ArrowLeft, Users, Calendar, Briefcase, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPublicJob, Job } from "@/services/jobService";
import { getAccessToken } from "@/services/userservice/auth";
import { SweetAlert } from "@/components/ui/SweetAlert";
type AlertVariant = "warning" | "success" | "info" | "error";

type UIJob = {
  id: string;
  title: string;
  company: string;
  industry: string | null;
  location: string | null;
  salary: string;
  type: string;
  posted: string;
  applicants: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  tags: string[];
  remote: boolean;
  featured: boolean;
  urgent: boolean;
  logo: string;
};

const timeAgo = (iso?: string | null) => {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days} days ago`;
  return new Date(iso).toLocaleDateString();
};

const toUIJob = (j: Job): UIJob => {
  const salary =
    j.salary_min && j.salary_max
      ? `$${j.salary_min.toLocaleString()} - $${j.salary_max.toLocaleString()}`
      : "—";

  // backend doesn't return company name; derive a short, readable label
  const companyShort = j.company_id ? `Company ${j.company_id.slice(0, 6)}` : "Company";

  const logo = (j.title || companyShort)
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");

  return {
    id: j.id,
    title: j.title,
    company: companyShort,
    industry: j.industry ?? null,
    location: j.location ?? null,
    salary,
    type: j.job_type,
    posted: timeAgo(j.posted_at ?? j.created_at),
    applicants: 0,
    description: j.description,
    requirements: j.requirements ?? [],
    responsibilities: j.responsibilities ?? [],
    benefits: j.benefits ?? [],
    tags: j.tags ?? [],
    remote: !!j.remote,
    featured: !!j.featured,
    urgent: !!j.urgent,
    logo,
  };
};

// right under your imports

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<UIJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [alert, setAlert] = useState({
    open: false,
    title: "Please login to continue",
    message: "You need to be logged in as an applicant to quick apply.",
    variant: "warning" as const,   // ✅ now matches SweetAlert type
  });

  // const closeAlert = () => {
  //   setAlert((a) => ({ ...a, open: false }));

  //   // Build a login URL that carries where to go after login
  //   const params = new URLSearchParams({
  //     redirect: "/interview",     // where to go after login
  //     jobId: job?.id ?? "",        // pass job id
  //     intent: "quick-apply",
  //     role: "applicant",           // hint your login which role
  //   });

  //   navigate(`/login?${params.toString()}`, { replace: true });
  // };

  const closeAlert = () => {
    setAlert(a => ({ ...a, open: false }));
    const params = new URLSearchParams({
      redirect: "/interview",
      jobId: job?.id ?? "",
      intent: "quick-apply",
      role: "applicant",
    });
    navigate(`/login?${params.toString()}`, { replace: true });
  };
  
  useEffect(() => {
    if (!jobId) {
      setError("Missing job id.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const apiJob = await getPublicJob(jobId);
        setJob(toUIJob(apiJob));
      } catch (e: any) {
        setError(e?.message || "Failed to load job.");
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);

  // const handleQuickApply = () => {
  //   const token = getAccessToken();

  //   if (!token) {
  //     setAlert({
  //       open: true,
  //       title: "Please login to continue",
  //       message: "You need to be logged in as an applicant to quick apply.",
  //       variant: "warning",
  //     });
  //     return;
  //   }

  //   // already logged in – proceed
  //   if (!job) return;
  //   navigate("/interview", { state: { job } });
  // };
  const handleQuickApply = () => {
    const token = getAccessToken();
    if (!token) {
      setAlert(a => ({ ...a, open: true }));   // use existing warning styling
      return;
    }
    if (!job) return;
    navigate("/interview", { state: { job } });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading job…</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Job not found."}</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>
    );
  }

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
                          {/* <span className="text-blue-600 font-bold text-xl">TC</span> */}
                          <span className="text-blue-600 font-bold text-xl">{job.logo}</span>

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
                  <Button onClick={handleQuickApply}
                    variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
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
            <SweetAlert
              open={alert.open}
              title={alert.title}
              message={alert.message}
              variant={alert.variant}                
              confirmText="Take me to login"         
              onConfirm={closeAlert}                 
              onClose={() => setAlert(a => ({ ...a, open: false }))} // ✕ just closes
            />



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
