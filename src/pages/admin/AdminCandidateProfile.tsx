
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCandidateProfile = () => {
  const { candidateId } = useParams();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Candidate {candidateId} Profile (Admin)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Admin candidate profile coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCandidateProfile;
