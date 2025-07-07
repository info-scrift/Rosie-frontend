
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { ReactNode } from "react";

interface AnimatedCardProps {
  className?: string;
  delay?: number;
  hover?: boolean;
  children: ReactNode;
}

export const AnimatedCard = ({ 
  className, 
  delay = 0, 
  hover = true, 
  children,
  ...props 
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={hover ? { 
        y: -4, 
        transition: { duration: 0.2 } 
      } : undefined}
    >
      <Card
        className={cn(
          "transition-shadow duration-300 hover:shadow-card-hover",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
};
