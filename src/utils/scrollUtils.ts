// Utility functions for managing scroll state across the application

/**
 * Ensures scroll is unlocked and restored to normal state
 * Call this on page mount and after redirections
 */
export const ensureScrollUnlocked = () => {
  document.body.style.overflow = "";
};

/**
 * Saves current scroll state and locks it (useful for modals)
 * Returns a function to restore the previous state
 */
export const lockScroll = (): (() => void) => {
  const currentOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  
  return () => {
    document.body.style.overflow = currentOverflow;
  };
};

/**
 * Hook to ensure scroll is unlocked when component mounts
 * and restored when component unmounts
 */
export const useScrollRestore = () => {
  // This will be called on mount
  ensureScrollUnlocked();
  
  // Return cleanup function for unmount
  return () => {
    ensureScrollUnlocked();
  };
};
