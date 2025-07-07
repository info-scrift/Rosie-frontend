
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewCandidate = () => {
  const { candidateId } = useParams();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Candidate Profile {candidateId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Candidate profile coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewCandidate;
