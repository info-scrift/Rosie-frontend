
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "./dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SlideInModalProps {
  children: ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SlideInModal = ({ 
  children, 
  className, 
  open, 
  onOpenChange,
  ...props 
}: SlideInModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <AnimatePresence>
        {open && (
          <DialogContent asChild className={cn("p-0", className)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {children}
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};
