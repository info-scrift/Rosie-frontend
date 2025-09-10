import { useState, useCallback, useEffect } from 'react';
import { ensureScrollUnlocked } from '@/utils/scrollUtils';

export interface SweetAlertState {
  open: boolean;
  title: string;
  message?: string;
  variant?: "success" | "error" | "info" | "warning";
  confirmText?: string;
  onConfirm?: () => void;
}

export interface SweetAlertActions {
  showAlert: (config: Omit<SweetAlertState, 'open'>) => void;
  closeAlert: () => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

export const useSweetAlert = (): [SweetAlertState, SweetAlertActions] => {
  const [alert, setAlert] = useState<SweetAlertState>({
    open: false,
    title: "",
    message: "",
    variant: "info"
  });

  const closeAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, open: false }));
  }, []);

  const showAlert = useCallback((config: Omit<SweetAlertState, 'open'>) => {
    setAlert({
      ...config,
      open: true
    });
  }, []);

  const showSuccess = useCallback((title: string, message?: string) => {
    showAlert({ title, message, variant: "success" });
  }, [showAlert]);

  const showError = useCallback((title: string, message?: string) => {
    showAlert({ title, message, variant: "error" });
  }, [showAlert]);

  const showWarning = useCallback((title: string, message?: string) => {
    showAlert({ title, message, variant: "warning" });
  }, [showAlert]);

  const showInfo = useCallback((title: string, message?: string) => {
    showAlert({ title, message, variant: "info" });
  }, [showAlert]);

  // Ensure scroll is restored when component unmounts or alert closes
  useEffect(() => {
    return () => {
      // Restore scroll on unmount
      ensureScrollUnlocked();
    };
  }, []);

  useEffect(() => {
    if (!alert.open) {
      // Ensure scroll is restored when alert closes
      ensureScrollUnlocked();
    }
  }, [alert.open]);

  const actions: SweetAlertActions = {
    showAlert,
    closeAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return [alert, actions];
};
