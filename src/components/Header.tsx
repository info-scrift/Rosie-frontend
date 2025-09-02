
import { useEffect, useState } from "react";
import { getUserRole, getAccessToken } from "@/services/userservice/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, Building, X, Home, Briefcase, MessageCircle, Phone, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState<boolean>(!!getAccessToken());
  const [role, setRole] = useState<string | null>(hasToken ? getUserRole() : null);

  useEffect(() => {
    const syncAuth = () => {
      const tok = getAccessToken();
      const r = tok ? (getUserRole() || "") : "";
      setHasToken(!!tok);
      setRole(r.trim() ? r : null); // only keep role if non-empty
    };


    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "role") syncAuth();
    };

    // Custom events your auth code can dispatch after login/logout/role change
    window.addEventListener("auth-changed", syncAuth as EventListener);
    window.addEventListener("role-changed", syncAuth as EventListener);
    window.addEventListener("storage", onStorage);

    // initial load
    syncAuth();

    return () => {
      window.removeEventListener("auth-changed", syncAuth as EventListener);
      window.removeEventListener("role-changed", syncAuth as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const location = useLocation();
  const normalizedRole = (role ?? "").trim().toLowerCase();

  const navigationItems = [
    { title: "Home", url: "/", icon: Home },
    { title: "Jobs", url: "/jobs", icon: Briefcase },
    // { title: "Voice Bot", url: "/voice-bot", icon: MessageCircle },
    // { title: "Hire", url: "/hire", icon: Phone },
    // { title: "Interview", url: "/interview", icon: Briefcase },

  ];

  const profileItems = [
    { title: "View Profile", url: "/profile" },
    { title: "My Applications", url: "/profile/applications" },
    { title: "Saved Jobs", url: "/profile/saved-jobs" },
    { title: "Settings", url: "/profile/settings" },
    { title: "Notifications", url: "/profile/notifications" },
  ];

  const employerItems = [
    { title: "Dashboard", url: "/client/dashboard" },
    { title: "Post a Job", url: "/client/jobs" },
    { title: "Manage Candidates", url: "/client/candidates" },
    { title: "Analytics", url: "/client/analytics" },
    { title: "Settings", url: "/client/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.55, 1.4] }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left Side */}
            <Link to="/" className="flex items-center space-x-3 z-50">
              <motion.img
                src="/lovable-uploads/1180c983-b41e-4fcf-891e-610f753c9d80.png"
                alt="BlueBridge Corporation"
                className="h-16 w-auto sm:h-18 md:h-20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-12 w-12 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative z-50 rounded-lg"
            >
              <motion.div
                animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.55, 1.4] }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Animated Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.55, 1.4] }}
          >
            <div className="pt-28 pb-8 px-6 h-full overflow-y-auto">
              <div className="max-w-md mx-auto space-y-8">
                {/* Navigation Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-6 px-2">Navigation</h2>
                  <div className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={item.url}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${isActive(item.url)
                            ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                            : 'hover:bg-slate-50 text-slate-700 border-2 border-transparent'
                            }`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isActive(item.url) ? 'bg-blue-100' : 'bg-slate-100'
                            }`}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <span className="text-lg font-medium">{item.title}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Account Section */}
                {/* Account Section – only when we have a role */}
                {role && (
                  <motion.div
                    className="border-t border-slate-200 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <h2 className="text-xl font-bold text-slate-900 mb-6 px-2">Account</h2>
                    <div className="space-y-3">

                      {normalizedRole === "company" ? (
                        // Employers Portal
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35, duration: 0.3 }}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="w-full flex items-center justify-between space-x-4 p-4 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors duration-200">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <Building className="w-6 h-6" />
                                  </div>
                                  <span className="text-lg font-medium">Employers Portal</span>
                                </div>
                                <ChevronDown className="w-5 h-5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white shadow-lg border border-slate-200">
                              {employerItems.map((item) => (
                                <DropdownMenuItem key={item.title} asChild>
                                  <Link
                                    to={item.url}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer"
                                  >
                                    {item.title}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      ) : (
                        // Applicant Profile
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35, duration: 0.3 }}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="w-full flex items-center justify-between space-x-4 p-4 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors duration-200">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <User className="w-6 h-6" />
                                  </div>
                                  <span className="text-lg font-medium">Profile</span>
                                </div>
                                <ChevronDown className="w-5 h-5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white shadow-lg border border-slate-200">
                              {profileItems.map((item) => (
                                <DropdownMenuItem key={item.title} asChild>
                                  <Link
                                    to={item.url}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm hover:bg-slate-50 cursor-pointer"
                                  >
                                    {item.title}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.div>
                      )}

                    </div>
                  </motion.div>
                )}

                {/* Get Started – always visible */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="pt-8 border-t border-slate-200"
                >
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
