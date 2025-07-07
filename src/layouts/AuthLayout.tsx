
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-slate-600/5"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(100, 116, 139, 0.05))",
            "linear-gradient(90deg, rgba(29, 78, 216, 0.08), rgba(59, 130, 246, 0.1))",
            "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.08))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Link to="/">
            <motion.img 
              src="/lovable-uploads/1180c983-b41e-4fcf-891e-610f753c9d80.png" 
              alt="BlueBridge Corporation" 
              className="h-16 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className="bg-white/95 backdrop-blur-xl border border-slate-200/60 py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
