import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  color?: "blue" | "green" | "purple" | "accent" | "red";
  delay?: number;
  className?: string;
}
export const StatsCard = ({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  color = "blue",
  delay = 0,
  className
}: StatsCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "green":
        return {
          icon: "text-success-600 bg-success-100",
          trend: trend === "up" ? "text-success-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
        };
      case "purple":
        return {
          icon: "text-purple-600 bg-purple-100",
          trend: trend === "up" ? "text-success-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
        };
      case "accent":
        return {
          icon: "text-accent-600 bg-accent-100",
          trend: trend === "up" ? "text-success-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
        };
      case "red":
        return {
          icon: "text-red-600 bg-red-100",
          trend: trend === "up" ? "text-success-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
        };
      default:
        return {
          icon: "text-primary-600 bg-primary-100",
          trend: trend === "up" ? "text-success-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
        };
    }
  };
  const colorClasses = getColorClasses();
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay
  }} className={cn("premium-card p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-black">
              {value}
            </p>
            {change && <p className={cn("text-sm font-medium", colorClasses.trend)}>
                {change}
              </p>}
          </div>
        </div>
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colorClasses.icon)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>;
};