
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ServerError = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-24 w-24 text-blue-500" />
          <h1 className="mt-6 text-4xl font-bold text-slate-900">500</h1>
          <h2 className="mt-2 text-xl font-semibold text-slate-700">Server Error</h2>
          <p className="mt-4 text-slate-600">
            Something went wrong on our end. We're working to fix this issue. Please try again later.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
          <Link to="/" className="block">
            <Button variant="outline" className="w-full border-slate-300 hover:bg-blue-50 hover:border-blue-300">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
