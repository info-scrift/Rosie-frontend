
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Client login:", formData);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Employer Sign In</h2>
        <p className="mt-2 text-gray-600">Access your hiring dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="text-gray-700">Company Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="company@example.com"
            className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Sign In to Dashboard
        </Button>
      </form>

      <div className="mt-6 space-y-4 text-center">
        <Link to="/client/forgot-password" className="text-blue-600 hover:text-blue-500 text-sm">
          Forgot your password?
        </Link>
        <p className="text-sm text-gray-600">
          Don't have an employer account?{" "}
          <Link to="/client/register" className="text-blue-600 hover:text-blue-500 font-medium">
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ClientLogin;
