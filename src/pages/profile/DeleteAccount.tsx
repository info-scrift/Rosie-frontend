
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DeleteAccount = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <Button variant="destructive">Confirm Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteAccount;
