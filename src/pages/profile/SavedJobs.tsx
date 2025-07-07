
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SavedJobs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Saved Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Your saved jobs will appear here...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedJobs;
