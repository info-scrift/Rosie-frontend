
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Application Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Application {applicationId} details coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDetail;
