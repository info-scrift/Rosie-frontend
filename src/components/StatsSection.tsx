
import { Briefcase, Users, Building, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      number: "15,000+",
      label: "Active Job Listings",
      description: "Across all industries"
    },
    {
      icon: Building,
      number: "2,500+",
      label: "Partner Companies",
      description: "From startups to Fortune 500"
    },
    {
      icon: Users,
      number: "50,000+",
      label: "Professionals Matched",
      description: "Successfully placed"
    },
    {
      icon: TrendingUp,
      number: "94%",
      label: "Success Rate",
      description: "Job placement satisfaction"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of professionals and companies who've found success with BlueBridge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
