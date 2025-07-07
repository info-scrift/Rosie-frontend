import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Briefcase, Users, Eye, UserCheck, Calendar, TrendingUp, Star, Clock, Plus, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  const applicationData = [{
    name: "Jan",
    applications: 45,
    interviews: 12
  }, {
    name: "Feb",
    applications: 62,
    interviews: 18
  }, {
    name: "Mar",
    applications: 38,
    interviews: 10
  }, {
    name: "Apr",
    applications: 78,
    interviews: 22
  }, {
    name: "May",
    applications: 55,
    interviews: 15
  }, {
    name: "Jun",
    applications: 89,
    interviews: 25
  }];
  const recentApplications = [{
    id: 1,
    candidate: "Sarah Johnson",
    position: "Senior Developer",
    appliedDate: "2024-01-20",
    status: "Interview Scheduled",
    score: 95,
    avatar: "SJ"
  }, {
    id: 2,
    candidate: "Michael Chen",
    position: "Product Manager",
    appliedDate: "2024-01-18",
    status: "Under Review",
    score: 92,
    avatar: "MC"
  }, {
    id: 3,
    candidate: "Emily Rodriguez",
    position: "UX Designer",
    appliedDate: "2024-01-22",
    status: "Phone Screen",
    score: 88,
    avatar: "ER"
  }, {
    id: 4,
    candidate: "David Wilson",
    position: "Data Scientist",
    appliedDate: "2024-01-19",
    status: "Rejected",
    score: 75,
    avatar: "DW"
  }];
  const activeJobs = [{
    id: 1,
    title: "Senior Software Engineer",
    applications: 127,
    status: "Active",
    posted: "5 days ago"
  }, {
    id: 2,
    title: "Product Manager",
    applications: 89,
    status: "Active",
    posted: "1 week ago"
  }, {
    id: 3,
    title: "UX Designer",
    applications: 156,
    status: "Active",
    posted: "3 days ago"
  }];
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
          <h1 className="text-4xl font-display font-bold text-gradient mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back! Here's your hiring overview.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/client/portal/jobs/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-blue-soft hover:shadow-blue-glow">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Active Jobs" value="12" change="+3" trend="up" icon={Briefcase} color="blue" delay={0} />
        <StatsCard title="Total Applications" value="347" change="+18%" trend="up" icon={Users} color="blue" delay={0.1} />
        <StatsCard title="Interviews Scheduled" value="23" change="+8" trend="up" icon={UserCheck} color="blue" delay={0.2} />
        <StatsCard title="Avg. Response Time" value="2.4 days" change="-0.5 days" trend="up" icon={Clock} color="blue" delay={0.3} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications Chart */}
        <div className="lg:col-span-2">
          <ProfessionalCard variant="executive">
            <CardHeader>
              <CardTitle className="flex items-center text-black">
                <TrendingUp className="w-5 h-5 mr-2" />
                Application Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={applicationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} name="Applications" />
                  <Line type="monotone" dataKey="interviews" stroke="#1d4ed8" strokeWidth={3} name="Interviews" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </ProfessionalCard>
        </div>

        {/* Quick Actions */}
        <div>
          <ProfessionalCard variant="executive">
            <CardHeader>
              <CardTitle className="text-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/client/portal/jobs/create">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white shadow-blue-soft hover:shadow-blue-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </Link>
              <Link to="/client/portal/candidates">
                <Button className="w-full justify-start bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                  <Users className="w-4 h-4 mr-2" />
                  Review Candidates
                </Button>
              </Link>
              <Link to="/client/portal/messages">
                <Button className="w-full justify-start bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </Link>
              <Link to="/client/portal/analytics">
                <Button className="w-full justify-start bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </ProfessionalCard>
        </div>
      </div>

      {/* Recent Applications & Active Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <ProfessionalCard variant="executive">
          <CardHeader>
            <CardTitle className="flex items-center text-black">
              <Users className="w-5 h-5 mr-2" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">{app.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-black">{app.candidate}</p>
                      <p className="text-sm text-muted-foreground">{app.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Star className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">{app.score}</span>
                    </div>
                    <Badge className={
                      app.status === "Interview Scheduled" ? "bg-blue-100 text-blue-800" :
                      app.status === "Phone Screen" ? "bg-slate-100 text-slate-800" :
                      app.status === "Rejected" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }>
                      {app.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/client/portal/candidates">
                <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                  View All Applications
                </Button>
              </Link>
            </div>
          </CardContent>
        </ProfessionalCard>

        {/* Active Jobs */}
        <ProfessionalCard variant="executive">
          <CardHeader>
            <CardTitle className="flex items-center text-black">
              <Briefcase className="w-5 h-5 mr-2" />
              Active Job Postings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-black">{job.title}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {job.applications} applications
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {job.posted}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {job.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/client/portal/jobs">
                <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700">
                  Manage All Jobs
                </Button>
              </Link>
            </div>
          </CardContent>
        </ProfessionalCard>
      </div>
    </div>
  );
};

export default ClientDashboard;
