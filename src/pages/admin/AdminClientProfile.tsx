
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminClientProfile = () => {
  const { clientId } = useParams();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Client {clientId} Profile (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Admin client profile coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminClientProfile;
