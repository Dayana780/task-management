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
        return "text-success";
      case "status_change":
        return "text-primary";
      case "priority_change":
        return "text-purple-600";
      case "comment":
        return "text-orange-600";
      case "delete":
        return "text-red-600";
      default:
        return "text-muted";
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case "create":
        return "Created";
      case "status_change":
        return "Status changed";
      case "priority_change":
        return "Priority changed";
      case "comment":
        return "Comment";
      case "delete":
        return "Deleted";
      default:
        return "Activity";
    }
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted">
        📭 No activity recorded yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="rounded-xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-50 text-lg">
              {getActionIcon(activity.action)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-zinc-800 sm:text-base">
                <span className="font-semibold">{activity.user || "user"}</span>{" "}
                {activity.details}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${getActionColor(activity.action)} bg-zinc-50`}
                >
                  {getActionLabel(activity.action)}
                </span>
                <span className="text-xs text-muted">
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
