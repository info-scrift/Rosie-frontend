
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building, 
  BarChart3, 
  FileText, 
  UserCheck, 
  Bell,
  FileSpreadsheet,
  Settings,
  Flag
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
  { name: 'Candidates', href: '/admin/candidates', icon: Users },
  { name: 'Clients', href: '/admin/clients', icon: Building },
  { name: 'Users', href: '/admin/users', icon: UserCheck },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Invoices', href: '/admin/invoices', icon: FileText },
  { name: 'Referrals', href: '/admin/referrals', icon: UserCheck },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Logs', href: '/admin/logs', icon: FileSpreadsheet },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Feature Flags', href: '/admin/feature-flags', icon: Flag },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/1180c983-b41e-4fcf-891e-610f753c9d80.png" 
            alt="BlueBridge Corporation" 
            className="h-8 w-auto"
          />
        </Link>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-blue-50 border-r-2 border-blue-600 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
