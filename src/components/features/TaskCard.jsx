import { useSortable } from "@dnd-kit/sortable";
import dayjs from "dayjs";
import { CSS } from "@dnd-kit/utilities";
import Button from "../ui/Button";

function TaskCard({ task, onStatusChange, onDelete }) {
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

  function handleDelete() {
    if (window.confirm("حذف بشه؟")) {
      onDelete(task.id);
    }
  }

  // ✅ اسم تابع رو اصلاح کردم: getPriorityColor (با i بعد از r و i دوم)
  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  function getPriorityText(priority) {
    switch (priority) {
      case "high":
        return "🔥 بالا";
      case "medium":
        return "📌 متوسط";
      case "low":
        return "✅ کم";
      default:
        return "❓ نامشخص";
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
        return "text-red-600 font-bold";
      case "soon":
        return "text-orange-600";
      default:
        return "text-gray-500";
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing"
    >
      <h3 className="font-medium">{task.title}</h3>
      <div className="flex justify-between items-center mt-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}
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
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        className="mt-2 text-sm border rounded px-2 py-1 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <option value="todo">📋 To Do</option>
        <option value="in-progress">⚡ In Progress</option>
        <option value="done">✅ Done</option>
      </select>
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
      <Button onClick={handleDelete} className="mt-2">
        Delete
      </Button>
    </div>
  );
}

export default TaskCard;
