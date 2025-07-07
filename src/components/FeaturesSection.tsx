
import { Mic, Brain, Zap, Shield, Globe, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice-Powered Navigation",
      description: "Search jobs, navigate pages, and get assistance using natural voice commands throughout the platform."
    },
    {
      icon: Brain,
      title: "AI Resume Analysis",
      description: "Upload your resume and get instant AI-powered analysis with personalized job recommendations and match scores."
    },
    {
      icon: Globe,
      title: "All Industries Covered",
      description: "From tech and healthcare to finance and hospitality - find opportunities across every industry and career level."
    },
    {
      icon: Zap,
      title: "Quick Apply Process",
      description: "Streamlined application workflow gets you from job discovery to submission in just a few clicks."
    },
    {
      icon: Users,
      title: "Employer Tools",
      description: "Comprehensive hiring platform for companies to post jobs, manage candidates, and find the perfect talent."
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Enterprise-grade security with verified employers and protected personal information throughout the process."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BlueBridge?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the next generation of recruitment technology designed to connect talent and opportunity more effectively than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
