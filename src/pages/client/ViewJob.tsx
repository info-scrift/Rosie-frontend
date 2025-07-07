
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewJob = () => {
  const { jobId } = useParams();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Job Details {jobId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Job details coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewJob;
