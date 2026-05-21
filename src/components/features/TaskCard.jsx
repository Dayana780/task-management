import { useSortable } from "@dnd-kit/sortable";
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing"
    >
      <h3 className="font-medium">{task.title}</h3>
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
