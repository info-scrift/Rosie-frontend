
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUserProfile = () => {
  const { userId } = useParams();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User {userId} Profile (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Admin user profile coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserProfile;
