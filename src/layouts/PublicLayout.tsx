
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalVoiceBot from "@/components/GlobalVoiceBot";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.4, 0.55, 1.4]
          }}
          className="flex-1 bg-white pt-6"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <GlobalVoiceBot />
    </div>
  );
};

export default PublicLayout;
