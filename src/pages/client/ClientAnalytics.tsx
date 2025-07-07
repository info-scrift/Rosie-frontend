
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  UserCheck, 
  Calendar,
  Target,
  Award,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ClientAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const applicationData = [
    { name: "Jan", applications: 45, views: 120 },
    { name: "Feb", applications: 62, views: 150 },
    { name: "Mar", applications: 38, views: 98 },
    { name: "Apr", applications: 78, views: 180 },
    { name: "May", applications: 55, views: 145 },
    { name: "Jun", applications: 89, views: 220 }
  ];

  const jobPerformanceData = [
    { name: "Senior Developer", applications: 127, conversion: 12 },
    { name: "Product Manager", applications: 89, conversion: 8 },
    { name: "UX Designer", applications: 156, conversion: 15 },
    { name: "Data Scientist", applications: 67, conversion: 7 },
    { name: "Marketing Lead", applications: 98, conversion: 11 }
  ];

  const sourceData = [
    { name: "Direct", value: 35, color: "#2563eb" },
    { name: "LinkedIn", value: 28, color: "#16a34a" },
    { name: "Indeed", value: 18, color: "#9333ea" },
    { name: "Referrals", value: 12, color: "#0ea5e9" },
    { name: "Other", value: 7, color: "#64748b" }
  ];

  const topCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Developer",
      score: 95,
      status: "Interview Scheduled",
      appliedDate: "2024-01-20"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager", 
      score: 92,
      status: "Under Review",
      appliedDate: "2024-01-18"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      score: 88,
      status: "Phone Screen",
      appliedDate: "2024-01-22"
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
            Hiring Analytics
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your recruitment performance and optimize your hiring process
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="executive-button-primary">
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value="1,247"
          change="+18%"
          trend="up"
          icon={Users}
          color="blue"
          delay={0}
        />
        <StatsCard
          title="Profile Views"
          value="8,932"
          change="+12%"
          trend="up"
          icon={Eye}
          color="green"
          delay={0.1}
        />
        <StatsCard
          title="Hired Candidates"
          value="23"
          change="+8%"
          trend="up"
          icon={UserCheck}
          color="purple"
          delay={0.2}
        />
        <StatsCard
          title="Avg. Time to Hire"
          value="14 days"
          change="-3 days"
          trend="up"
          icon={Clock}
          color="accent"
          delay={0.3}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applications Over Time */}
        <ProfessionalCard variant="executive">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Applications Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Applications"
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  name="Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </ProfessionalCard>

        {/* Application Sources */}
        <ProfessionalCard variant="executive">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Application Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </ProfessionalCard>
      </div>

      {/* Job Performance */}
      <ProfessionalCard variant="executive">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Job Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#2563eb" name="Applications" />
              <Bar dataKey="conversion" fill="#16a34a" name="Interviews" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </ProfessionalCard>

      {/* Top Candidates */}
      <ProfessionalCard variant="executive">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Top Candidates This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                    <span className="text-accent-600 font-semibold">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{candidate.name}</p>
                    <p className="text-sm text-muted-foreground">{candidate.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-accent-600">{candidate.score}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                  <Badge className={
                    candidate.status === "Interview Scheduled" ? "status-badge-active" :
                    candidate.status === "Phone Screen" ? "status-badge-pending" :
                    "status-badge-inactive"
                  }>
                    {candidate.status}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(candidate.appliedDate).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </ProfessionalCard>
    </div>
  );
};

export default ClientAnalytics;
