
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info - Enhanced Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                <img 
                  src="/lovable-uploads/1180c983-b41e-4fcf-891e-610f753c9d80.png" 
                  alt="BlueBridge Corporation" 
                  className="logo-footer filter brightness-0 invert" 
                />
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Connecting exceptional talent with outstanding opportunities. 
              Your career success is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/jobs" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Browse Jobs</Link></li>
              <li><Link to="/companies" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Companies</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Contact</Link></li>
              <li><Link to="/careers" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Careers</Link></li>
            </ul>
          </motion.div>

          {/* For Employers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">For Employers</h3>
            <ul className="space-y-3">
              <li><Link to="/client/portal" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Post a Job</Link></li>
              <li><Link to="/client/pricing" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/client/dashboard" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Dashboard</Link></li>
              <li><Link to="/client/resources" className="text-slate-300 hover:text-blue-400 transition-colors text-sm">Resources</Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-slate-300 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                123 Business St, Suite 100, New York, NY 10001
              </li>
              <li className="flex items-center text-slate-300 text-sm">
                <Phone className="w-4 h-4 mr-2 text-blue-400" />
                (555) 123-4567
              </li>
              <li className="flex items-center text-slate-300 text-sm">
                <Mail className="w-4 h-4 mr-2 text-blue-400" />
                contact@bluebridge.com
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 sm:mb-0">
            © 2024 BlueBridge Corporation. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
              Terms of Service
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-blue-400 hover:bg-slate-800 p-2"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
