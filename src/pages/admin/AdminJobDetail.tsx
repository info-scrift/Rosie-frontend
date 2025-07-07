
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminJobDetail = () => {
  const { jobId } = useParams();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Job {jobId} Details (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Admin job details coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminJobDetail;
