
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import AdminTopBar from "@/components/AdminTopBar";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PageTransition } from "@/components/ui/page-transition";

const AdminLayout = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopBar />
        <motion.main 
          className="flex-1 p-6"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
