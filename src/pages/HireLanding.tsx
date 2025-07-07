import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Target, CheckCircle, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { ProfessionalCard } from "@/components/ui/professional-card";
const HireLanding = () => {
  const benefits = [{
    icon: Users,
    title: "Pre-Vetted Talent",
    description: "Access to a curated pool of qualified professionals across all industries"
  }, {
    icon: Clock,
    title: "Faster Hiring",
    description: "Reduce your time-to-hire by up to 60% with our streamlined process"
  }, {
    icon: Target,
    title: "Perfect Matches",
    description: "AI-powered matching ensures candidates align with your specific requirements"
  }, {
    icon: CheckCircle,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee with replacement candidates if needed"
  }];
  const process = [{
    step: 1,
    title: "Tell Us Your Needs",
    description: "Share your job requirements and company culture"
  }, {
    step: 2,
    title: "We Find Talent",
    description: "Our AI matches you with pre-vetted candidates"
  }, {
    step: 3,
    title: "Review & Interview",
    description: "Screen candidates and conduct interviews"
  }, {
    step: 4,
    title: "Make Your Hire",
    description: "Extend offers and onboard your new team member"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div className="text-center" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Great Talent, Fast
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connect with pre-vetted professionals across all industries. 
              Reduce hiring time by 60% with AI-powered matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hire/book-call">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
              </Link>
              <Link to="/hire/proposal">
                <Button size="lg" variant="outline" className="border-white px-8 py-4 bg-[sidebar-primary-foreground] bg-sidebar-accent text-sidebar-ring">
                  <FileText className="w-5 h-5 mr-2" />
                  Get Custom Proposal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 gradient-professional bg-[sidebar-accent-foreground] bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div className="text-center mb-12" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose BlueBridge for Hiring?
            </h2>
            <p className="text-xl text-gray-600">
              We make hiring simple, fast, and effective
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => <ProfessionalCard key={index} delay={index * 0.1} variant="executive" className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-zinc-950">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </ProfessionalCard>)}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <motion.div className="text-center mb-12" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Our streamlined 4-step process gets you quality hires fast
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => <motion.div key={index} className="text-center" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.2,
            duration: 0.8
          }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg mb-2 font-semibold text-zinc-950">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white bg-blue-600">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Join hundreds of companies that have streamlined their hiring with BlueBridge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hire/book-call">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4">
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link to="/client/register">
                <Button size="lg" variant="outline" className="border-white px-8 py-4 bg-sidebar-accent text-sidebar-ring">
                  Create Employer Account
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>;
};
export default HireLanding;