import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Edit, Briefcase } from "lucide-react";
const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    headline: "Senior Software Engineer",
    summary: "Experienced software engineer with 8+ years in full-stack development. Passionate about building scalable web applications and leading technical teams.",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
    experience: [{
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      duration: "2020 - Present",
      description: "Lead development of microservices architecture serving 1M+ users"
    }, {
      title: "Software Engineer",
      company: "StartupXYZ",
      duration: "2018 - 2020",
      description: "Built full-stack web applications using React and Node.js"
    }]
  };
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <p className="text-lg text-gray-600 mb-2">{user.headline}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {user.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {user.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {user.location}
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/profile/edit">
                <Button variant="outline" className="bg-blue-50 text-zinc-950">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{user.summary}</p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => <Badge key={index} variant="secondary">
                  {skill}
                </Badge>)}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {user.experience.map((exp, index) => <div key={index} className="border-l-2 border-blue-200 pl-6 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/profile/applications">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">My Applications</h3>
                <p className="text-sm text-gray-600">View your job applications</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/profile/saved-jobs">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Saved Jobs</h3>
                <p className="text-sm text-gray-600">Jobs you've bookmarked</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/profile/settings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Settings</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>;
};
export default Profile;