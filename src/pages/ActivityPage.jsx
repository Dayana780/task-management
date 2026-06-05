import { useState, useEffect } from "react";
import { History } from "lucide-react";
import ActivityLog from "../components/features/ActivityLog";

function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/activities")
      .then((res) => res.json())
      .then((data) => {
        setActivities(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
          <History size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            Activity History
          </h1>
          <p className="text-sm text-muted">{activities.length} event(s)</p>
        </div>
      </div>

      <ActivityLog activities={activities} />
    </div>
  );
}

export default ActivityPage;
