import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Eye, 
  Edit3, 
  Ban, 
  Mail,
  GraduationCap,
  Calendar,
  Star,
  MapPin,
  Briefcase
} from "lucide-react";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ProfessionalCard } from "@/components/ui/professional-card";

const AdminCandidates = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      title: "Senior Software Engineer",
      experience: "5 years",
      location: "San Francisco, CA",
      skills: ["React", "Node.js", "Python"],
      status: "Active",
      rating: 4.8,
      applications: 12,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      title: "Product Manager",
      experience: "7 years",
      location: "New York, NY",
      skills: ["Product Strategy", "Analytics", "Leadership"],
      status: "Active",
      rating: 4.9,
      applications: 8,
      joinDate: "2023-11-20",
      lastActive: "1 day ago",
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      title: "UX Designer",
      experience: "4 years",
      location: "Remote",
      skills: ["Figma", "User Research", "Prototyping"],
      status: "Looking",
      rating: 4.7,
      applications: 15,
      joinDate: "2024-02-10",
      lastActive: "3 hours ago",
      avatar: "ER"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@email.com",
      title: "Data Scientist",
      experience: "6 years",
      location: "Seattle, WA",
      skills: ["Python", "ML", "Statistics"],
      status: "Inactive",
      rating: 4.6,
      applications: 5,
      joinDate: "2023-12-05",
      lastActive: "1 week ago",
      avatar: "DW"
    }
  ];

  const columns = [
    {
      key: "name" as keyof typeof candidates[0],
      title: "Candidate",
      sortable: true,
      render: (value: string, row: typeof candidates[0]) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
            <span className="text-accent-600 font-semibold text-sm">{row.avatar}</span>
          </div>
          <div>
            <p className="font-medium text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{row.email}</p>
            <div className="flex items-center mt-1">
              <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{row.location}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: "title" as keyof typeof candidates[0],
      title: "Position",
      sortable: true,
      render: (value: string, row: typeof candidates[0]) => (
        <div>
          <p className="font-medium text-foreground">{value}</p>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Briefcase className="w-3 h-3 mr-1" />
            {row.experience}
          </div>
        </div>
      )
    },
    {
      key: "skills" as keyof typeof candidates[0],
      title: "Skills",
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: "rating" as keyof typeof candidates[0],
      title: "Rating",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <Star className="w-4 h-4 text-blue-500 mr-1" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: "status" as keyof typeof candidates[0],
      title: "Status",
      sortable: true,
      render: (value: string) => (
        <Badge className={
          value === "Active" ? "status-badge-active" :
          value === "Looking" ? "status-badge-pending" :
          "status-badge-inactive"
        }>
          {value}
        </Badge>
      )
    },
    {
      key: "applications" as keyof typeof candidates[0],
      title: "Applications",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value}</span>
      )
    }
  ];

  const stats = [
    { label: "Total Candidates", value: candidates.length, color: "blue" },
    { label: "Active Candidates", value: candidates.filter(c => c.status === "Active").length, color: "blue" },
    { label: "Looking for Work", value: candidates.filter(c => c.status === "Looking").length, color: "blue" },
    { label: "Avg Rating", value: "4.7", color: "blue" }
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
          <p className="text-lg text-muted-foreground">
            Manage and review all platform candidates
          </p>
        </div>
        <Button className="executive-button-primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Candidate
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
            <ProfessionalCard variant="executive" className="p-6 text-center">
              <div className="space-y-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </ProfessionalCard>
          </motion.div>
        ))}
      </div>

      {/* Candidates Table */}
      <ProfessionalCard variant="executive">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            All Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={candidates}
            columns={columns}
            searchable={true}
            filterable={true}
            pagination={true}
            pageSize={10}
            actions={(row) => (
              <>
                <DropdownMenuItem asChild>
                  <Link to={`/admin/candidates/${row.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/admin/candidates/${row.id}/edit`}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend Account
                </DropdownMenuItem>
              </>
            )}
          />
        </CardContent>
      </ProfessionalCard>
    </div>
  );
};

export default AdminCandidates;
