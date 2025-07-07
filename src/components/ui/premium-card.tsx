
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PremiumCardProps {
  className?: string;
  delay?: number;
  hover?: boolean;
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "glass" | "premium" | "executive";
}

export const PremiumCard = ({ 
  className, 
  delay = 0, 
  hover = true, 
  children,
  onClick,
  variant = "default",
  ...props 
}: PremiumCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "glass-effect";
      case "premium":
        return "premium-card";
      case "executive":
        return "bg-white border border-gray-100 rounded-2xl shadow-premium hover:shadow-card-hover";
      default:
        return "bg-card border border-border rounded-xl shadow-card hover:shadow-card-hover";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: [0.25, 0.4, 0.55, 1.4]
      }}
      whileHover={hover ? { 
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" } 
      } : undefined}
      onClick={onClick}
      className={cn(
        getVariantClasses(),
        "transition-all duration-300 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
