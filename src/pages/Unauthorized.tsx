
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Shield className="mx-auto h-24 w-24 text-red-500" />
          <h1 className="mt-6 text-4xl font-bold text-gray-900">401</h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-700">Unauthorized Access</h2>
          <p className="mt-4 text-gray-600">
            You don't have permission to access this page. Please log in with the appropriate credentials.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link to="/login" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </Link>
          <Link to="/" className="block">
            <Button variant="outline" className="w-full">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
