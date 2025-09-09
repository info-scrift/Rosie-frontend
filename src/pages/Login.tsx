
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/services/userservice/login";
import { saveAuthTokens } from "@/services/userservice/auth";
import { SweetAlert } from "@/components/ui/SweetAlert";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  type AlertVariant = "success" | "warning" | "error" | "info";
  const closeAlert = () => setAlert((a) => ({ ...a, open: false }));
  const confirmAlert = () => {
    const cb = alert.onConfirm;
    closeAlert();
    cb?.();
  };
  const [alert, setAlert] = useState<{
    open: boolean;
    title: string;
    message: string;
    variant: AlertVariant;
    confirmText: string;
    onConfirm?: () => void;
  }>({
    open: false,
    title: "",
    message: "",
    variant: "info",
    confirmText: "OK",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    console.log("Login attempt:", formData);
    try {
      const res = await loginUser(formData.email, formData.password);
      const role =
        (res?.user?.role ||
          res?.user?.user_metadata?.role ||
          res?.user?.app_metadata?.role ||
          "")?.toLowerCase();
      // Save tokens
      saveAuthTokens(res.access_token, res.refresh_token, { role: res.user.role });
      console.log(res.user.role);
      // use backend-provided redirect
      const redirectUrl = new URL(res.redirect, window.location.origin);

      // (optional) let the rest of the app react immediately
      window.dispatchEvent(new Event("auth-changed"));
      window.dispatchEvent(new Event("role-changed"));
      const go = () => {
        if (redirectUrl.origin === window.location.origin) {
          navigate(redirectUrl.pathname + redirectUrl.search, { replace: true });
        } else {
          window.location.href = redirectUrl.toString();
        }
      };
      // show success alert, and redirect on confirm
      setAlert({
        open: true,
        title: "Login successful",
        message: "Redirecting…",
        variant: "success",
        confirmText: "Continue",
        onConfirm: go,

      });

      // auto-redirect after a short delay so the alert is visible
      setTimeout(go, 2000); 


    } catch (error: any) {
      // Extract a friendly message
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid email or password. Please try again.";

      setAlert({
        open: true,
        title: "Login failed",
        message: msg,
        variant: "error",
        confirmText: "Try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="w-full max-w-md mx-auto">
      <SweetAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        variant={alert.variant}
        confirmText={alert.confirmText}
        onConfirm={confirmAlert}
        onClose={closeAlert}
      />
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-gray-700">Email address</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className="pr-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
            />
            <Label htmlFor="remember" className="text-sm text-gray-700">
              Remember me
            </Label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Google
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
