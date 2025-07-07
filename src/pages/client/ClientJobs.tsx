
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  Users, 
  Calendar,
  MapPin,
  DollarSign,
  Briefcase
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { GradientButton } from "@/components/ui/gradient-button";
import { InteractiveTooltip } from "@/components/ui/interactive-tooltip";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

const ClientJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      applicants: 23,
      status: "Active",
      posted: "2 days ago",
      description: "Lead development of scalable web applications using React and Node.js"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time", 
      salary: "$140k - $200k",
      applicants: 31,
      status: "Active",
      posted: "5 days ago",
      description: "Drive product strategy and work with cross-functional teams"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $120k",
      applicants: 18,
      status: "Paused",
      posted: "1 week ago", 
      description: "Design user-centered experiences for our platform"
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Engineering",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130k - $170k",
      applicants: 12,
      status: "Draft",
      posted: "3 days ago",
      description: "Build ML models to improve our matching algorithms"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Paused": return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400";
      case "Draft": return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      <FadeInSection>
        <div className="flex justify-between items-center">
          <div>
            <motion.h1 
              className="text-4xl font-display font-bold text-gradient mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Job Postings
            </motion.h1>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Manage your active job listings and track applications.
            </motion.p>
          </div>
        </div>
      </FadeInSection>

      {/* Search and Filter Bar */}
      <FadeInSection delay={0.3}>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search job titles, departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setFilterOpen(!filterOpen)}
                className="bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to="/client/portal/jobs/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-soft hover:shadow-blue-glow">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          </div>
        </div>
      </FadeInSection>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job, index) => (
          <AnimatedCard key={job.id} delay={index * 0.1} className="card-hover group">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl font-display group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {job.department}
                    </Badge>
                    <motion.span 
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {job.status}
                    </motion.span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <InteractiveTooltip content="View Details">
                    <Link to={`/client/portal/jobs/${job.id}`}>
                      <motion.button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </InteractiveTooltip>
                  <InteractiveTooltip content="Edit Job">
                    <Link to={`/client/portal/jobs/${job.id}/edit`}>
                      <motion.button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </InteractiveTooltip>
                  <InteractiveTooltip content="Delete Job">
                    <motion.button
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </InteractiveTooltip>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {job.posted}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium">{job.applicants}</span>
                  <span className="text-muted-foreground ml-1">applicants</span>
                </div>
                <Link to={`/client/portal/jobs/${job.id}`}>
                  <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden">
        <FloatingActionButton 
          onClick={() => window.location.href = '/client/portal/jobs/create'}
          icon={<Plus className="w-6 h-6" />}
        />
      </div>
    </div>
  );
};

export default ClientJobs;
