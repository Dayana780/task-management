import { useSortable } from "@dnd-kit/sortable";
import dayjs from "dayjs";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import CommentSection from "./CommentSection";

function TaskCard({ task, onStatusChange, onDelete, onAddComment }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Stop drag from stealing clicks on buttons/inputs
  const stopDrag = (e) => e.stopPropagation();

  function handleDelete(e) {
    e.stopPropagation();
    if (window.confirm("Delete this task?")) {
      onDelete(task.id);
    }
  }

  const handleAddComment = (commentText) => {
    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      author: "user",
      createdAt: new Date().toISOString(),
    };
    onAddComment(task.id, newComment);
  };

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-zinc-100 text-zinc-800";
    }
  }

  function getPriorityText(priority) {
    switch (priority) {
      case "high":
        return "🔥 High";
      case "medium":
        return "📌 Medium";
      case "low":
        return "✅ Low";
      default:
        return "❓ Unknown";
    }
  }

  function getDueDateStatus(dueDate) {
    if (!dueDate) return null;
    const today = dayjs().startOf("day");
    const due = dayjs(dueDate).startOf("day");
    const daysDiff = due.diff(today, "day");
    if (daysDiff < 0) return "past";
    if (daysDiff <= 2) return "soon";
    return "ok";
  }

  function getDueDateColor(status) {
    switch (status) {
      case "past":
        return "text-red-600 font-semibold";
      case "soon":
        return "text-orange-600";
      default:
        return "text-muted";
    }
  }

  const tagColors = {
    study: "bg-purple-100 text-purple-800",
    job: "bg-indigo-100 text-indigo-800",
    feature: "bg-green-100 text-green-800",
    bug: "bg-red-100 text-red-800",
    documentation: "bg-blue-100 text-blue-800",
    urgent: "bg-orange-100 text-orange-800",
    react: "bg-cyan-100 text-cyan-800",
    css: "bg-pink-100 text-pink-800",
  };

  function getTagColor(tag) {
    return tagColors[tag] || "bg-zinc-100 text-zinc-800";
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="rounded-xl border border-border bg-card p-3 shadow-sm transition hover:shadow-md sm:p-4"
    >
      {/* Drag handle — only this area triggers drag */}
      <div
        {...listeners}
        className="flex cursor-grab items-start gap-2 active:cursor-grabbing"
      >
        <GripVertical size={16} className="mt-0.5 shrink-0 text-muted" />
        <h3 className="flex-1 font-medium text-zinc-900">{task.title}</h3>
      </div>

      {task.description && (
        <p className="mt-1 pl-6 text-sm text-muted line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Priority & due date row */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pl-6">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}
        >
          {getPriorityText(task.priority)}
        </span>

        {task.dueDate && (
          <span
            className={`text-xs ${getDueDateColor(getDueDateStatus(task.dueDate))}`}
          >
            📅 {dayjs(task.dueDate).format("YYYY/MM/DD")}
          </span>
        )}
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 pl-6">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2 py-0.5 text-xs ${getTagColor(tag)}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Interactive controls — isolated from drag */}
      <div
        className="mt-3 space-y-2 pl-6"
        onPointerDown={stopDrag}
        onClick={stopDrag}
      >
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="w-full rounded-lg border border-border px-2 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="todo">📋 To Do</option>
          <option value="in-progress">⚡ In Progress</option>
          <option value="done">✅ Done</option>
        </select>

        <Button
          onClick={handleDelete}
          variant="danger"
          className="flex w-full items-center justify-center gap-1 py-1.5 text-xs sm:text-sm"
        >
          <Trash2 size={14} />
          Delete
        </Button>

        <CommentSection
          comments={task.comments || []}
          onAddComment={handleAddComment}
        />
      </div>
    </div>
  );
}

export default TaskCard;
