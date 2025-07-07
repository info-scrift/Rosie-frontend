
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, DollarSign, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const JobMatches = () => {
  const matches = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      matchScore: 95,
      tags: ["React", "TypeScript", "Node.js"],
      reasons: [
        "Strong match for React and TypeScript skills",
        "Your 5+ years experience aligns with requirements",
        "Previous startup experience is valued"
      ],
      description: "Join our innovative team building next-generation web applications..."
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Innovation Labs",
      industry: "Technology",
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      type: "Full-time",
      matchScore: 88,
      tags: ["Product Strategy", "Agile", "Analytics"],
      reasons: [
        "Your project management experience is highly relevant",
        "Technical background gives you an edge",
        "Remote work experience matches company culture"
      ],
      description: "Lead product strategy and development for cutting-edge applications..."
    },
    {
      id: "3",
      title: "UX Designer",
      company: "Creative Studio",
      industry: "Design",
      location: "Austin, TX",
      salary: "$85,000 - $105,000",
      type: "Full-time",
      matchScore: 82,
      tags: ["Figma", "User Research", "Prototyping"],
      reasons: [
        "Design portfolio shows strong UI/UX skills",
        "Experience with design systems",
        "Collaborative approach matches team needs"
      ],
      description: "Create beautiful, user-centered designs for web and mobile applications..."
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-primary-700 bg-primary-100 border-primary-200";
    if (score >= 80) return "text-blue-700 bg-blue-100 border-blue-200";
    return "text-accent-700 bg-accent-100 border-accent-200";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Your Job Matches
            </h1>
            <p className="text-xl text-slate-600">
              Based on your resume analysis, here are your top job recommendations
            </p>
          </div>

          <div className="space-y-6">
            {matches.map((match) => (
              <Card key={match.id} className="hover:shadow-lg transition-shadow bg-white border-slate-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-slate-900">{match.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-base text-slate-600">
                        <span className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {match.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {match.salary}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className={`px-3 py-1 rounded-full flex items-center border ${getMatchColor(match.matchScore)}`}>
                        <Star className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{match.matchScore}% Match</span>
                      </div>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700">{match.industry}</Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {match.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-primary-600 border-primary-200 bg-primary-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Match Reasons */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Why this job matches you:</h4>
                      <ul className="space-y-1">
                        {match.reasons.map((reason, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm">{match.description}</p>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-2">
                      <Link to={`/jobs/${match.id}`}>
                        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                          View Details
                        </Button>
                      </Link>
                      <Link to="/apply">
                        <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                          Quick Apply
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="border-primary-300 text-primary-600 hover:bg-primary-50">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobMatches;
