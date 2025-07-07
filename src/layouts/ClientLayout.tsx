
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import ClientSidebar from "@/components/ClientSidebar";
import ClientTopBar from "@/components/ClientTopBar";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PageTransition } from "@/components/ui/page-transition";

const ClientLayout = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <ClientSidebar />
      <div className="flex-1 flex flex-col">
        <ClientTopBar />
        <motion.main 
          initial={{ opacity: 0, x: 10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.3 }} 
          className="flex-1 p-6 bg-slate-50"
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </motion.main>
      </div>
    </div>
  );
};

export default ClientLayout;
