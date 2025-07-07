
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminEditJob = () => {
  const { jobId } = useParams();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Job {jobId} (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Admin job editing coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEditJob;
