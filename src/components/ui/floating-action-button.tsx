
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FloatingActionButtonProps {
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const FloatingActionButton = ({ 
  onClick, 
  icon = <Plus className="w-6 h-6" />, 
  className,
  size = "md"
}: FloatingActionButtonProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-14 h-14", 
    lg: "w-16 h-16"
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 rounded-full bg-gradient-primary text-white shadow-lg z-50 flex items-center justify-center",
        sizeClasses[size],
        className
      )}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
    >
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
};
