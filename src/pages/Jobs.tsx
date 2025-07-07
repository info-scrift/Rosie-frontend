
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, MapPin, Building, DollarSign, Clock, Bookmark, Filter, Briefcase, Users, Star, ArrowRight, Heart, Eye, TrendingUp, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { PremiumCard } from "@/components/ui/premium-card";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const itemsPerPage = 8;

  // Expanded job listings
  const allJobs = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$140,000 - $180,000",
      posted: "2 days ago",
      applicants: 34,
      description: "Join our innovative team building next-generation cloud applications with cutting-edge technologies...",
      tags: ["React", "TypeScript", "AWS", "Node.js"],
      featured: true,
      remote: true,
      logo: "TC",
      urgent: false
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Innovation Labs",
      industry: "Technology",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      posted: "1 day ago",
      applicants: 28,
      description: "Lead product strategy and development for our revolutionary fintech platform...",
      tags: ["Product Strategy", "Agile", "Analytics", "Fintech"],
      featured: false,
      remote: false,
      logo: "IL",
      urgent: true
    },
    {
      id: "3",
      title: "Senior UX Designer",
      company: "Design Studio Pro",
      industry: "Design",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$95,000 - $125,000",
      posted: "3 days ago",
      applicants: 41,
      description: "Create beautiful, user-centered designs for web and mobile applications...",
      tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
      featured: true,
      remote: true,
      logo: "DS",
      urgent: false
    },
    {
      id: "4",
      title: "Data Scientist",
      company: "Analytics Pro",
      industry: "Technology",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$150,000 - $190,000",
      posted: "1 week ago",
      applicants: 19,
      description: "Analyze complex datasets to drive business insights and machine learning solutions...",
      tags: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      featured: false,
      remote: true,
      logo: "AP",
      urgent: false
    },
    {
      id: "5",
      title: "Marketing Director",
      company: "Growth Partners",
      industry: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "4 days ago",
      applicants: 22,
      description: "Lead our marketing team to drive growth and brand awareness across multiple channels...",
      tags: ["Growth Marketing", "Digital Strategy", "Analytics", "Team Leadership"],
      featured: false,
      remote: false,
      logo: "GP",
      urgent: false
    },
    {
      id: "6",
      title: "DevOps Engineer",
      company: "CloudTech Inc",
      industry: "Technology",
      location: "Remote",
      type: "Full-time",
      salary: "$125,000 - $155,000",
      posted: "5 days ago",
      applicants: 15,
      description: "Build and maintain cloud infrastructure for our high-scale applications...",
      tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      featured: true,
      remote: true,
      logo: "CT",
      urgent: false
    },
    {
      id: "7",
      title: "Frontend Developer",
      company: "Web Solutions",
      industry: "Technology",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      posted: "6 days ago",
      applicants: 31,
      description: "Build responsive web applications using modern frontend technologies...",
      tags: ["React", "Vue.js", "CSS", "JavaScript"],
      featured: false,
      remote: true,
      logo: "WS",
      urgent: false
    },
    {
      id: "8",
      title: "Sales Manager",
      company: "Business Growth Co",
      industry: "Sales",
      location: "Miami, FL",
      type: "Full-time",
      salary: "$80,000 - $110,000",
      posted: "1 week ago",
      applicants: 24,
      description: "Drive sales growth and manage key client relationships...",
      tags: ["B2B Sales", "CRM", "Negotiation", "Team Management"],
      featured: false,
      remote: false,
      logo: "BG",
      urgent: true
    },
    {
      id: "9",
      title: "Backend Engineer",
      company: "Server Systems",
      industry: "Technology",
      location: "Denver, CO",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "3 days ago",
      applicants: 17,
      description: "Develop scalable backend systems and APIs for high-traffic applications...",
      tags: ["Node.js", "PostgreSQL", "Redis", "Microservices"],
      featured: false,
      remote: true,
      logo: "SS",
      urgent: false
    },
    {
      id: "10",
      title: "UI/UX Designer",
      company: "Creative Agency",
      industry: "Design",
      location: "Portland, OR",
      type: "Contract",
      salary: "$70,000 - $95,000",
      posted: "2 days ago",
      applicants: 38,
      description: "Design intuitive user interfaces and experiences for digital products...",
      tags: ["Sketch", "Adobe XD", "User Testing", "Wireframing"],
      featured: false,
      remote: true,
      logo: "CA",
      urgent: false
    },
    {
      id: "11",
      title: "Machine Learning Engineer",
      company: "AI Innovations",
      industry: "Technology",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$160,000 - $200,000",
      posted: "1 day ago",
      applicants: 12,
      description: "Build and deploy machine learning models at scale...",
      tags: ["Python", "TensorFlow", "PyTorch", "MLOps"],
      featured: true,
      remote: true,
      logo: "AI",
      urgent: true
    },
    {
      id: "12",
      title: "Project Manager",
      company: "Enterprise Solutions",
      industry: "Management",
      location: "Atlanta, GA",
      type: "Full-time",
      salary: "$95,000 - $125,000",
      posted: "1 week ago",
      applicants: 26,
      description: "Manage complex projects and coordinate cross-functional teams...",
      tags: ["PMP", "Agile", "Scrum", "Risk Management"],
      featured: false,
      remote: false,
      logo: "ES",
      urgent: false
    }
  ];

  const industries = ["Technology", "Design", "Marketing", "Sales", "Management", "Healthcare", "Finance", "Education"];
  const locations = ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Los Angeles, CA", "Remote", "Chicago, IL", "Miami, FL", "Denver, CO", "Portland, OR", "Boston, MA", "Atlanta, GA"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIndustry = selectedIndustry === "all" || job.industry === selectedIndustry;
    const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
    const matchesType = selectedType === "all" || job.type === selectedType;
    
    return matchesSearch && matchesIndustry && matchesLocation && matchesType;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "salary":
        return parseInt(b.salary.split(" - ")[1].replace(/[^0-9]/g, "")) - parseInt(a.salary.split(" - ")[1].replace(/[^0-9]/g, ""));
      case "applicants":
        return b.applicants - a.applicants;
      case "company":
        return a.company.localeCompare(b.company);
      default: // newest
        return new Date(b.posted).getTime() - new Date(a.posted).getTime();
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = sortedJobs.slice(startIndex, startIndex + itemsPerPage);

  const featuredJobs = paginatedJobs.filter(job => job.featured);
  const regularJobs = paginatedJobs.filter(job => !job.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto container-padding py-12">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Discover Your Next{" "}
            <span className="text-gradient-primary">Dream Job</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Explore thousands of opportunities from top companies across all industries
          </p>
          <div className="flex items-center space-x-6 mt-6">
            <div className="flex items-center text-slate-600">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium text-slate-900">{filteredJobs.length}</span>
              <span className="ml-1">active positions</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium text-slate-900">{featuredJobs.length}</span>
              <span className="ml-1">featured roles</span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PremiumCard variant="executive" className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Main Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 text-lg h-14 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-700">
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry} className="text-slate-700">
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-700">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location} className="text-slate-700">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-700">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-slate-700">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 shadow-blue-soft">
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </PremiumCard>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <p className="text-lg text-slate-700">
              Found <span className="font-bold text-slate-900">{filteredJobs.length}</span> opportunities
            </p>
            {featuredJobs.length > 0 && (
              <p className="text-sm text-blue-600 font-medium">
                {featuredJobs.length} featured positions
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white border-slate-200 text-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest" className="text-slate-700">Most Recent</SelectItem>
                <SelectItem value="salary" className="text-slate-700">Highest Salary</SelectItem>
                <SelectItem value="applicants" className="text-slate-700">Most Popular</SelectItem>
                <SelectItem value="company" className="text-slate-700">Company A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Featured Jobs */}
        {featuredJobs.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900">Featured Opportunities</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredJobs.map((job, index) => (
                <PremiumCard key={job.id} delay={index * 0.1} variant="executive" className="relative overflow-hidden hover:shadow-blue-glow transition-all duration-300">
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    {job.urgent && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <Zap className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-lg">{job.logo}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl mb-2 hover:text-blue-600 transition-colors text-slate-900">
                          <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm mb-3">
                          <span className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {job.company}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          {job.remote && (
                            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                              Remote
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-blue-600 font-semibold">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex items-center text-slate-500 text-sm">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applicants} applicants
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.posted}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="hover:text-red-500">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Link to={`/jobs/${job.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </PremiumCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Job Listings */}
        {regularJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <Briefcase className="w-6 h-6 text-slate-600 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900">All Opportunities</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {regularJobs.map((job, index) => (
                <PremiumCard key={job.id} delay={index * 0.05} variant="executive" className="hover:shadow-blue-glow transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-slate-600 font-semibold">{job.logo}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <CardTitle className="text-lg hover:text-blue-600 transition-colors text-slate-900">
                              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                            </CardTitle>
                            {job.urgent && (
                              <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-slate-600 text-sm mb-2">
                            <span className="flex items-center">
                              <Building className="w-3 h-3 mr-1" />
                              {job.company}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </span>
                          </div>
                          <div className="flex items-center text-blue-600 font-semibold text-sm">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="hover:text-red-500">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                          {tag}
                        </Badge>
                      ))}
                      {job.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                          +{job.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-slate-500 text-xs">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.posted}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {job.applicants}
                        </span>
                      </div>
                      <Link to={`/jobs/${job.id}`}>
                        <Button size="sm" variant="outline" className="hover:border-blue-300 border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </PremiumCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "text-slate-700 hover:text-blue-600"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={currentPage === page}
                      className={currentPage === page ? "bg-blue-600 text-white border-blue-600" : "text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "text-slate-700 hover:text-blue-600"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search criteria to find more opportunities.</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("all");
                setSelectedLocation("all");
                setSelectedType("all");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
