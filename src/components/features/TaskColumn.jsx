import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

function TaskColumn({ id, title, status, tasks, onStatusChange, onDelete }) {
  const { setNodeRef } = useDroppable({ id });
  const filteredTasks = tasks.filter((task) => task.status === status);
  const taskIds = filteredTasks.map((task) => task.id);

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 rounded-lg p-4"
      data-column-id={id}
    >
      <h2 className="font-bold mb-3 text-center">{title}</h2>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
          {filteredTasks.length === 0 && (
            <p className="text-gray-400 text-center py-4">No tasks</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default TaskColumn;
