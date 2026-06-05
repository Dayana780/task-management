import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function ActivityLog({ activities }) {
  const getActionIcon = (action) => {
    switch (action) {
      case "create":
        return "➕";
      case "status_change":
        return "🔄";
      case "priority_change":
        return "🏷️";
      case "comment":
        return "💬";
      case "delete":
        return "🗑️";
      default:
        return "📝";
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case "create":
        return "text-green-600";
      case "status_change":
        return "text-blue-600";
      case "priority_change":
        return "text-purple-600";
      case "comment":
        return "text-orange-600";
      case "delete":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        📭 هنوز فعالیتی ثبت نشده است
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-blue-400"
        >
          <div className="flex items-start gap-2">
            <span className="text-xl">{getActionIcon(activity.action)}</span>
            <div className="flex-1">
              <p className="text-gray-800">
                <span className="font-medium">{activity.user || "کاربر"}</span>
                {" " + activity.details}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${getActionColor(activity.action)}`}>
                  {activity.action === "create" && "ایجاد"}
                  {activity.action === "status_change" && "تغییر وضعیت"}
                  {activity.action === "priority_change" && "تغییر اولویت"}
                  {activity.action === "comment" && "نظر"}
                  {activity.action === "delete" && "حذف"}
                </span>
                <span className="text-xs text-gray-400">
                  {dayjs(activity.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityLog;
