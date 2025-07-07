
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/ui/data-table";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { 
  Users, 
  Building, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Calendar,
  Star,
  Eye,
  Edit3,
  Ban
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "blue" as const
    },
    {
      title: "Active Clients",
      value: "1,423",
      change: "+8%",
      trend: "up" as const,
      icon: Building,
      color: "green" as const
    },
    {
      title: "Job Postings",
      value: "8,932",
      change: "+18%",
      trend: "up" as const,
      icon: Briefcase,
      color: "purple" as const
    },
    {
      title: "Revenue",
      value: "$342,890",
      change: "+22%",
      trend: "up" as const,
      icon: DollarSign,
      color: "green" as const
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      user: "Sarah Johnson",
      action: "New user registered",
      timestamp: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "job_posting",
      user: "TechCorp Solutions",
      action: "Posted new job: Senior Developer",
      timestamp: "4 hours ago",
      status: "active"
    },
    {
      id: 3,
      type: "application",
      user: "Michael Chen",
      action: "Applied to Product Manager role",
      timestamp: "6 hours ago",
      status: "pending"
    },
    {
      id: 4,
      type: "client_subscription",
      user: "Innovation Labs",
      action: "Upgraded to Premium plan",
      timestamp: "1 day ago",
      status: "completed"
    }
  ];

  const topJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      applications: 127,
      status: "Active",
      posted: "3 days ago"
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      applications: 89,
      status: "Active",
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio Pro",
      applications: 156,
      status: "Active",
      posted: "5 days ago"
    }
  ];

  const jobColumns = [
    {
      key: "title" as keyof typeof topJobs[0],
      title: "Job Title",
      sortable: true
    },
    {
      key: "company" as keyof typeof topJobs[0],
      title: "Company",
      sortable: true
    },
    {
      key: "applications" as keyof typeof topJobs[0],
      title: "Applications",
      sortable: true,
      render: (value: number) => (
        <Badge variant="secondary">{value}</Badge>
      )
    },
    {
      key: "status" as keyof typeof topJobs[0],
      title: "Status",
      render: (value: string) => (
        <Badge className={value === "Active" ? "status-badge-active" : "status-badge-inactive"}>
          {value}
        </Badge>
      )
    },
    {
      key: "posted" as keyof typeof topJobs[0],
      title: "Posted",
      sortable: true
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration": return <Users className="w-4 h-4 text-blue-600" />;
      case "job_posting": return <Briefcase className="w-4 h-4 text-green-600" />;
      case "application": return <Star className="w-4 h-4 text-blue-600" />;
      case "client_subscription": return <TrendingUp className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">
          Admin Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Platform overview and system management
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ProfessionalCard variant="executive">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.user}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={
                          activity.status === "completed" ? "status-badge-active" :
                          activity.status === "active" ? "status-badge-active" :
                          "status-badge-pending"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </ProfessionalCard>
        </div>

        {/* Quick Actions */}
        <div>
          <ProfessionalCard variant="executive">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/users">
                <Button className="w-full justify-start executive-button-primary">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
              <Link to="/admin/clients">
                <Button className="w-full justify-start executive-button-secondary">
                  <Building className="w-4 h-4 mr-2" />
                  Manage Clients
                </Button>
              </Link>
              <Link to="/admin/jobs">
                <Button className="w-full justify-start executive-button-secondary">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Manage Jobs
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button className="w-full justify-start executive-button-secondary">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </ProfessionalCard>
        </div>
      </div>

      {/* Top Jobs Table */}
      <ProfessionalCard variant="executive">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Top Job Postings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={topJobs}
            columns={jobColumns}
            searchable={true}
            pagination={false}
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

export default AdminDashboard;
