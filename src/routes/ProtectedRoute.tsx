import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken, getUserRole } from "@/services/userservice/auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAccessToken?.();
    const role = (getUserRole?.() || "").toLowerCase();
    setOk(!!token && role === "company"); // local, fast gate
  }, []);

  if (ok === null) {
    return <div className="p-6 text-sm text-muted-foreground">Checking session…</div>;
  }
  if (!ok) {
    return <Navigate to="/client/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
