
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOwnJobById, listJobApplications } from "@/services/companyservice";

const ViewJob = () => {
  const { jobId = "" } = useParams();
  const [job, setJob] = useState<any | null>(null);
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [j, a] = await Promise.all([getOwnJobById(jobId), listJobApplications(jobId)]);
        setJob(j);
        setApps(a);
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!job) return <div className="p-6">Not found</div>;

  // Render job details with `job`, and perhaps show `apps.length` somewhere.
};

// const ViewJob = () => {
//   const { jobId } = useParams();
//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Job Details {jobId}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-gray-600">Job details coming soon...</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

export default ViewJob;
