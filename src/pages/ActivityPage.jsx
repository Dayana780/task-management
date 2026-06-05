import { useState, useEffect } from "react";
import ActivityLog from "../components/features/ActivityLog";

function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/activities")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setActivities(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 تاریخچه فعالیت‌ها</h1>
      <ActivityLog activities={activities} />
    </div>
  );
}

export default ActivityPage;
