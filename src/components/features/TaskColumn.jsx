import TaskCard from "./TaskCard";

function TaskColumn({ title, status, tasks, onStatusChange, onDelete }) {
  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h2 className="font-bold mb-3 text-center">{title}</h2>
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
    </div>
  );
}

export default TaskColumn;
