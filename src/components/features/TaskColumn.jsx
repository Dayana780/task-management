import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

function TaskColumn({
  id,
  title,
  status,
  tasks,
  onStatusChange,
  onDelete,
  onAddComment,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const filteredTasks = tasks.filter((task) => task.status === status);
  const taskIds = filteredTasks.map((task) => task.id);

  // Column header colors per status
  const headerColors = {
    todo: "border-t-blue-500 bg-blue-50/50",
    "in-progress": "border-t-orange-500 bg-orange-50/50",
    done: "border-t-green-500 bg-green-50/50",
  };

  return (
    <div
      ref={setNodeRef}
      data-column-id={id}
      className={`min-h-[200px] rounded-xl border border-border border-t-4 p-3 transition sm:p-4 ${headerColors[status]} ${
        isOver ? "ring-2 ring-primary/30" : ""
      }`}
    >
      <h2 className="mb-3 text-center text-sm font-bold text-zinc-700 sm:text-base">
        {title}
        <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-normal text-muted">
          {filteredTasks.length}
        </span>
      </h2>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onAddComment={onAddComment}
            />
          ))}
          {filteredTasks.length === 0 && (
            <p className="py-8 text-center text-sm text-muted">No tasks</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default TaskColumn;
