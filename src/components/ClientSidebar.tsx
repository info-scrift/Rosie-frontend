
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  BarChart3, 
  CreditCard, 
  Settings, 
  UserPlus 
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/client/portal', icon: LayoutDashboard },
  { name: 'Jobs', href: '/client/portal/jobs', icon: Briefcase },
  { name: 'Candidates', href: '/client/portal/candidates', icon: Users },
  { name: 'Messages', href: '/client/portal/messages', icon: MessageSquare },
  { name: 'Analytics', href: '/client/portal/analytics', icon: BarChart3 },
  { name: 'Billing', href: '/client/portal/billing', icon: CreditCard },
  { name: 'Team', href: '/client/portal/team', icon: UserPlus },
  { name: 'Settings', href: '/client/portal/settings', icon: Settings },
];

const ClientSidebar = () => {
  const location = useLocation();

  return (
    <motion.div 
      className="w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col"
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <motion.img 
            src="/lovable-uploads/1180c983-b41e-4fcf-891e-610f753c9d80.png" 
            alt="BlueBridge Corporation" 
            className="h-8 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                </motion.div>
                {item.name}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default ClientSidebar;
