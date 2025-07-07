import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Building, Zap, Globe, CheckCircle, TrendingUp, Shield, Clock, Star, Mic } from "lucide-react";
import { PremiumCard } from "@/components/ui/premium-card";
const Index = () => {
  const features = [{
    icon: Zap,
    title: "AI-Powered Matching",
    description: "Advanced machine learning algorithms that analyze skills, experience, and cultural fit to connect the perfect candidates with opportunities."
  }, {
    icon: Globe,
    title: "Global Talent Network",
    description: "Access to professionals across all industries worldwide, from tech startups to Fortune 500 companies."
  }, {
    icon: Mic,
    title: "Voice-First Experience",
    description: "Navigate, search, and apply using natural speech with our cutting-edge voice assistant technology."
  }, {
    icon: Shield,
    title: "Verified Professionals",
    description: "All candidates go through our comprehensive verification process to ensure quality and authenticity."
  }, {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Get instant notifications on application status, new matches, and industry insights."
  }, {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Personalized recommendations for skill development and career advancement opportunities."
  }];
  const stats = [{
    number: "150K+",
    label: "Active Professionals",
    icon: Users
  }, {
    number: "50K+",
    label: "Job Opportunities",
    icon: Building
  }, {
    number: "5K+",
    label: "Partner Companies",
    icon: Star
  }, {
    number: "98%",
    label: "Success Rate",
    icon: CheckCircle
  }];
  const testimonials = [{
    name: "Sarah Chen",
    role: "Senior Developer at TechnoCorp",
    content: "BlueBridge's AI matching found me the perfect role in just 2 weeks. The voice assistant made the entire process seamless.",
    avatar: "SC"
  }, {
    name: "Michael Rodriguez",
    role: "HR Director at InnovateInc",
    content: "We've hired 50+ excellent candidates through BlueBridge. Their talent verification process is outstanding.",
    avatar: "MR"
  }, {
    name: "Lisa Wang",
    role: "Product Manager at FutureTech",
    content: "The personalized job recommendations were spot-on. I found opportunities I never would have discovered otherwise.",
    avatar: "LW"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden gradient-blue-light">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-sky-50/30 to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center max-w-5xl mx-auto" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <motion.h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              Find Your Perfect Career with{" "}
              <span className="text-gradient-blue">AI-Powered</span> Precision
            </motion.h1>
            
            <motion.p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }}>
              Connect with opportunities across all industries. Upload your profile, 
              let our advanced AI find perfect matches, and apply with voice assistance.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              <Link to="/upload-resume">
                <Button size="lg" className="saas-button-primary px-8 py-4 text-lg h-12">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" className="saas-button-outline px-8 py-4 text-lg h-12">
                  Explore Opportunities
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => <motion.div key={stat.label} className="text-center" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1,
            duration: 0.6
          }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 gradient-blue-light">
        <div className="max-w-7xl mx-auto container-padding">
          
          <motion.div className="text-center mb-20" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Why Professionals Choose BlueBridge
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of recruitment with cutting-edge technology and personalized service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <PremiumCard key={feature.title} delay={index * 0.1} variant="executive" className="p-8 text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-50 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </PremiumCard>)}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          
          <motion.div className="text-center mb-16" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community says about their BlueBridge experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <PremiumCard key={testimonial.name} delay={index * 0.2} variant="executive" className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </PremiumCard>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 gradient-blue-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Job Seekers */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center border border-white/20">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6">For Professionals</h3>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Discover your next career opportunity with AI-powered matching. 
                Upload your profile and let technology work for you.
              </p>
              <Link to="/upload-resume">
                <Button size="lg" variant="secondary" className="w-full saas-button-secondary py-4 text-lg bg-white text-primary-700 hover:bg-white/90">
                  Find Opportunities
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
            
            {/* Employers */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center border border-white/20">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Building className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6">For Employers</h3>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Access verified talent across all industries. Post jobs and find 
                the perfect candidates with our advanced screening process.
              </p>
              <Link to="/hire">
                <Button size="lg" variant="secondary" className="w-full saas-button-secondary py-4 text-lg bg-white text-primary-700 hover:bg-white/90">
                  Start Hiring
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;