
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Plus, 
  Eye, 
  Edit3, 
  Ban, 
  Building,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ProfessionalCard } from "@/components/ui/professional-card";

const AdminJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$140k - $180k",
      status: "Active",
      applications: 127,
      posted: "2024-01-15",
      expires: "2024-03-15",
      featured: true
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k - $160k",
      status: "Active",
      applications: 89,
      posted: "2024-01-20",
      expires: "2024-03-20",
      featured: false
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio Pro",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $120k",
      status: "Paused",
      applications: 156,
      posted: "2024-01-10",
      expires: "2024-03-10",
      featured: true
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$150k - $190k",
      status: "Draft",
      applications: 23,
      posted: "2024-01-25",
      expires: "2024-03-25",
      featured: false
    },
    {
      id: 5,
      title: "Marketing Director",
      company: "Growth Partners",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      status: "Expired",
      applications: 67,
      posted: "2023-12-01",
      expires: "2024-01-01",
      featured: false
    }
  ];

  const columns = [
    {
      key: "title" as keyof typeof jobs[0],
      title: "Job Title",
      sortable: true,
      render: (value: string, row: typeof jobs[0]) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <p className="font-medium text-foreground">{value}</p>
            {row.featured && (
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                Featured
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Building className="w-3 h-3 mr-1" />
              {row.company}
            </span>
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {row.location}
            </span>
          </div>
        </div>
      )
    },
    {
      key: "type" as keyof typeof jobs[0],
      title: "Type",
      sortable: true,
      render: (value: string) => (
        <Badge variant="secondary">{value}</Badge>
      )
    },
    {
      key: "salary" as keyof typeof jobs[0],
      title: "Salary",
      sortable: true
    },
    {
      key: "status" as keyof typeof jobs[0],
      title: "Status",
      sortable: true,
      render: (value: string) => {
        const getStatusIcon = () => {
          switch (value) {
            case "Active": return <CheckCircle className="w-3 h-3 mr-1" />;
            case "Paused": return <Clock className="w-3 h-3 mr-1" />;
            case "Draft": return <Edit3 className="w-3 h-3 mr-1" />;
            case "Expired": return <XCircle className="w-3 h-3 mr-1" />;
            default: return null;
          }
        };

        return (
          <Badge className={
            value === "Active" ? "status-badge-active" :
            value === "Paused" ? "bg-blue-100 text-blue-800" :
            value === "Draft" ? "status-badge-inactive" :
            "status-badge-danger"
          }>
            {getStatusIcon()}
            {value}
          </Badge>
        );
      }
    },
    {
      key: "applications" as keyof typeof jobs[0],
      title: "Applications",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: "posted" as keyof typeof jobs[0],
      title: "Posted",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ];

  const stats = [
    { 
      label: "Total Jobs", 
      value: jobs.length, 
      icon: Briefcase,
      color: "blue" 
    },
    { 
      label: "Active Jobs", 
      value: jobs.filter(j => j.status === "Active").length, 
      icon: CheckCircle,
      color: "green" 
    },
    { 
      label: "Total Applications", 
      value: jobs.reduce((sum, job) => sum + job.applications, 0), 
      icon: Users,
      color: "purple" 
    },
    { 
      label: "Featured Jobs", 
      value: jobs.filter(j => j.featured).length, 
      icon: TrendingUp,
      color: "accent" 
    }
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
            Job Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage all job postings across the platform
          </p>
        </div>
        <Button className="executive-button-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Job
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProfessionalCard variant="executive" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-accent-600" />
                </div>
              </div>
            </ProfessionalCard>
          </motion.div>
        ))}
      </div>

      {/* Jobs Table */}
      <ProfessionalCard variant="executive">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            All Job Postings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={jobs}
            columns={columns}
            searchable={true}
            filterable={true}
            pagination={true}
            pageSize={10}
            actions={(row) => (
              <>
                <DropdownMenuItem asChild>
                  <Link to={`/admin/jobs/${row.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/admin/jobs/${row.id}/edit`}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Job
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Feature Job
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend Job
                </DropdownMenuItem>
              </>
            )}
          />
        </CardContent>
      </ProfessionalCard>
    </div>
  );
};

export default AdminJobs;
