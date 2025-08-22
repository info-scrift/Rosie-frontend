import React from "react";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

type SweetAlertProps = {
  open: boolean;
  title: string;
  message?: React.ReactNode;
  variant?: "success" | "error" | "info" | "warning";
  confirmText?: string;
  onConfirm?: () => void;
  onClose: () => void;
};

const VariantIcon: React.FC<{ variant: SweetAlertProps["variant"] }> = ({ variant }) => {
  switch (variant) {
    case "success":
      return <CheckCircle2 className="w-6 h-6" />;
    case "error":
      return <AlertTriangle className="w-6 h-6" />;
    case "warning":
      return <AlertTriangle className="w-6 h-6" />;
    default:
      return <Info className="w-6 h-6" />;
  }
};

const variantClasses: Record<
  NonNullable<SweetAlertProps["variant"]>,
  { icon: string; title: string; button: string; ring: string }
> = {
  success: {
    icon: "text-green-600",
    title: "text-green-700",
    button: "bg-green-600 hover:bg-green-700 text-white",
    ring: "focus:ring-green-500",
  },
  error: {
    icon: "text-red-600",
    title: "text-red-700",
    button: "bg-red-600 hover:bg-red-700 text-white",
    ring: "focus:ring-red-500",
  },
  info: {
    icon: "text-blue-600",
    title: "text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    ring: "focus:ring-blue-500",
  },
  warning: {
    icon: "text-amber-600",
    title: "text-amber-700",
    button: "bg-amber-600 hover:bg-amber-700 text-white",
    ring: "focus:ring-amber-500",
  },
};

export const SweetAlert: React.FC<SweetAlertProps> = ({
  open,
  title,
  message,
  variant = "info",
  confirmText = "OK",
  onConfirm,
  onClose,
}) => {
  if (!open) return null;

  const vc = variantClasses[variant];

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />
      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Top-left close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className={`${vc.icon} shrink-0 mt-0.5`}>
              <VariantIcon variant={variant} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${vc.title}`}>{title}</h3>
              {message ? (
                <div className="mt-1.5 text-sm text-slate-600">{message}</div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleConfirm}
              className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${vc.button} ${vc.ring}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
