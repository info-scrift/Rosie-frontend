
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export const LoadingSkeleton = ({ className, lines = 1 }: LoadingSkeletonProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("p-6 border rounded-lg space-y-4", className)}>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded shimmer w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer w-5/6" />
      </div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded shimmer w-1/3" />
    </div>
  );
};
