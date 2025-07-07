
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mic, Upload, Search, Briefcase } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connecting passionate talent with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              {" "}meaningful opportunities
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the future of recruitment with AI-powered voice navigation. 
            Find your perfect job or hire exceptional talent across all industries.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/upload-resume">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Upload className="w-5 h-5 mr-2" />
                Upload Resume & Get Matched
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3">
                <Search className="w-5 h-5 mr-2" />
                Browse All Jobs
              </Button>
            </Link>
          </div>

          {/* Voice Bot Feature Highlight */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-full p-3">
                <Mic className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              AI-Powered Voice Assistant
            </h3>
            <p className="text-gray-600 mb-4">
              Navigate our platform hands-free! Search for jobs, get recommendations, and apply using just your voice.
            </p>
            <Link to="/voice-bot">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Try Voice Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
