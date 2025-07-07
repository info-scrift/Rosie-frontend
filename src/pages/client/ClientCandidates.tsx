import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, Eye, MessageCircle, Download, Star, Calendar, Briefcase, Award, Mail, Phone, MapPin } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ClientCandidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const candidates = [{
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    role: "Senior Software Engineer",
    experience: "8 years",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    score: 95,
    status: "Interview Scheduled",
    appliedDate: "2024-01-20",
    lastActivity: "2 hours ago",
    avatar: "SJ",
    salary: "$150k - $180k"
  }, {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    role: "Product Manager",
    experience: "6 years",
    skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
    score: 92,
    status: "Under Review",
    appliedDate: "2024-01-18",
    lastActivity: "1 day ago",
    avatar: "MC",
    salary: "$130k - $160k"
  }, {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    role: "UX Designer",
    experience: "5 years",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    score: 88,
    status: "Phone Screen",
    appliedDate: "2024-01-22",
    lastActivity: "3 hours ago",
    avatar: "ER",
    salary: "$95k - $125k"
  }, {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    role: "Data Scientist",
    experience: "7 years",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    score: 90,
    status: "Hired",
    appliedDate: "2024-01-15",
    lastActivity: "1 week ago",
    avatar: "DW",
    salary: "$150k - $190k"
  }, {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "+1 (555) 567-8901",
    location: "Remote",
    role: "Marketing Director",
    experience: "10 years",
    skills: ["Growth Marketing", "Digital Strategy", "Analytics", "Team Leadership"],
    score: 85,
    status: "Rejected",
    appliedDate: "2024-01-12",
    lastActivity: "2 weeks ago",
    avatar: "LT",
    salary: "$120k - $150k"
  }];
  const columns = [
    {
      key: "name" as keyof typeof candidates[0],
      title: "Candidate",
      sortable: true,
      render: (value: string, row: typeof candidates[0]) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center relative">
            <span className="text-blue-600 font-semibold">{row.avatar}</span>
            {row.score >= 90 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-blue-600 fill-current" />
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-slate-900">{value}</p>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Mail className="w-3 h-3" />
              <span>{row.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <MapPin className="w-3 h-3" />
              <span>{row.location}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: "role" as keyof typeof candidates[0],
      title: "Applied For",
      sortable: true,
      render: (value: string, row: typeof candidates[0]) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{value}</p>
          <div className="flex items-center text-sm text-slate-600">
            <Briefcase className="w-3 h-3 mr-1" />
            {row.experience}
          </div>
          <p className="text-sm text-blue-600 font-medium">{row.salary}</p>
        </div>
      )
    },
    {
      key: "skills" as keyof typeof candidates[0],
      title: "Skills",
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {skill}
            </Badge>
          ))}
          {value.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              +{value.length - 3}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: "score" as keyof typeof candidates[0],
      title: "Match Score",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                value >= 90 ? 'bg-blue-500' : value >= 80 ? 'bg-blue-400' : 'bg-gray-400'
              }`} 
              style={{ width: `${value}%` }} 
            />
          </div>
          <span className="text-sm font-medium text-slate-900">{value}%</span>
        </div>
      )
    },
    {
      key: "status" as keyof typeof candidates[0],
      title: "Status",
      sortable: true,
      render: (value: string) => (
        <Badge className={value === "Hired" ? "status-badge-active" : value === "Interview Scheduled" ? "bg-blue-100 text-blue-800" : value === "Phone Screen" ? "status-badge-pending" : value === "Under Review" ? "bg-purple-100 text-purple-800" : "status-badge-danger"}>
          {value}
        </Badge>
      )
    },
    {
      key: "appliedDate" as keyof typeof candidates[0],
      title: "Applied",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center text-sm text-slate-600">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ];
  const statusStats = [
    { label: "Total Candidates", value: candidates.length, color: "blue" },
    { label: "Under Review", value: candidates.filter(c => c.status === "Under Review").length, color: "blue" },
    { label: "Interviews", value: candidates.filter(c => c.status.includes("Interview") || c.status.includes("Phone")).length, color: "blue" },
    { label: "Hired", value: candidates.filter(c => c.status === "Hired").length, color: "blue" }
  ];
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">
            Candidate Management
          </h1>
          <p className="text-lg text-slate-600">
            Review, evaluate, and manage your job applicants
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="executive-button-secondary focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="executive-button-primary focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </motion.div>

      {/* Status Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statusStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProfessionalCard variant="executive" className="p-6 text-center">
              <div className="space-y-2">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </ProfessionalCard>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <ProfessionalCard variant="executive" className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="interview">Interview Scheduled</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="engineer">Software Engineer</SelectItem>
              <SelectItem value="product">Product Manager</SelectItem>
              <SelectItem value="design">Designer</SelectItem>
              <SelectItem value="data">Data Scientist</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ProfessionalCard>

      {/* Candidates Table */}
      <ProfessionalCard variant="executive">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900">
            <Users className="w-5 h-5 mr-2" />
            All Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={candidates}
            columns={columns}
            searchable={false}
            filterable={false}
            pagination={true}
            pageSize={10}
            actions={(row) => (
              <>
                <DropdownMenuItem asChild>
                  <Link to={`/client/portal/candidates/${row.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Interview
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Award className="w-4 h-4 mr-2" />
                  Move to Next Stage
                </DropdownMenuItem>
              </>
            )}
          />
        </CardContent>
      </ProfessionalCard>
    </div>
  );
};

export default ClientCandidates;
