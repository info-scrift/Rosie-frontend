
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
  Shield,
  Calendar
} from "lucide-react";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ProfessionalCard } from "@/components/ui/professional-card";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "Job Seeker",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2 hours ago",
      applications: 12,
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@techcorp.com",
      role: "Employer",
      status: "Active",
      joinDate: "2023-11-20",
      lastLogin: "1 day ago",
      applications: 0,
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      role: "Job Seeker",
      status: "Suspended",
      joinDate: "2024-02-10",
      lastLogin: "1 week ago",
      applications: 8,
      avatar: "ER"
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@innovationlabs.com",
      role: "Employer",
      status: "Active",
      joinDate: "2023-12-05",
      lastLogin: "3 hours ago",
      applications: 0,
      avatar: "DW"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      role: "Job Seeker",
      status: "Inactive",
      joinDate: "2023-10-18",
      lastLogin: "2 weeks ago",
      applications: 23,
      avatar: "LT"
    }
  ];

  const columns = [
    {
      key: "name" as keyof typeof users[0],
      title: "User",
      sortable: true,
      render: (value: string, row: typeof users[0]) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
            <span className="text-accent-600 font-semibold text-sm">{row.avatar}</span>
          </div>
          <div>
            <p className="font-medium text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: "role" as keyof typeof users[0],
      title: "Role",
      sortable: true,
      render: (value: string) => (
        <Badge variant="secondary" className="flex items-center">
          {value === "Employer" ? (
            <Shield className="w-3 h-3 mr-1" />
          ) : (
            <Users className="w-3 h-3 mr-1" />
          )}
          {value}
        </Badge>
      )
    },
    {
      key: "status" as keyof typeof users[0],
      title: "Status",
      sortable: true,
      render: (value: string) => (
        <Badge className={
          value === "Active" ? "status-badge-active" :
          value === "Suspended" ? "status-badge-danger" :
          "status-badge-inactive"
        }>
          {value}
        </Badge>
      )
    },
    {
      key: "applications" as keyof typeof users[0],
      title: "Applications",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: "joinDate" as keyof typeof users[0],
      title: "Join Date",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(value).toLocaleDateString()}
        </div>
      )
    },
    {
      key: "lastLogin" as keyof typeof users[0],
      title: "Last Login",
      sortable: true
    }
  ];

  const stats = [
    { label: "Total Users", value: users.length, color: "blue" },
    { label: "Active Users", value: users.filter(u => u.status === "Active").length, color: "green" },
    { label: "Job Seekers", value: users.filter(u => u.role === "Job Seeker").length, color: "purple" },
    { label: "Employers", value: users.filter(u => u.role === "Employer").length, color: "orange" }
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
            User Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage all platform users and their access
          </p>
        </div>
        <Button className="executive-button-primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
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

      {/* Users Table */}
      <ProfessionalCard variant="executive">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={users}
            columns={columns}
            searchable={true}
            filterable={true}
            pagination={true}
            pageSize={10}
            actions={(row) => (
              <>
                <DropdownMenuItem asChild>
                  <Link to={`/admin/users/${row.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/admin/users/${row.id}/edit`}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit User
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Ban className="w-4 h-4 mr-2" />
                  Suspend User
                </DropdownMenuItem>
              </>
            )}
          />
        </CardContent>
      </ProfessionalCard>
    </div>
  );
};

export default AdminUsers;
