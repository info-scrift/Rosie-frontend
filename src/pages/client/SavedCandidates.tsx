
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SavedCandidates = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Saved Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Saved candidates coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedCandidates;
