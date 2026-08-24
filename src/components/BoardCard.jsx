import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Color map for board accent stripe
const colorMap = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
};

function BoardCard({ board }) {
  const accentColor = colorMap[board.color] || colorMap.blue;

  return (
    <Link to={`/boards/${board.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
        {/* Top color stripe */}
        <div className={`h-1.5 ${accentColor}`} />

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-zinc-800 group-hover:text-primary">
              {board.name}
            </h3>
            <ArrowRight
              size={18}
              className="mt-1 shrink-0 text-muted opacity-0 transition group-hover:opacity-100"
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted">
              Board #
              {String(board.id).length > 8
                ? String(board.id).slice(0, 8)
                : board.id}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize text-white ${accentColor}`}
            >
              {board.color || "blue"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BoardCard;
