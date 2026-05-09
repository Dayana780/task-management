import Button from "../ui/Button";
function TaskCard({ task, onStatusChange, onDelete }) {
  function handleDelete() {
    if (window.confirm("جذف بشه؟")) {
      onDelete(task.id);
    }
  }
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-medium">{task.title}</h3>
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task.id, e.target.value)}
        className="mt-2 text-sm border rounded px-2 py-1 w-full"
      >
        <option value="todo">📋 To Do</option>
        <option value="in-progress">⚡ In Progress</option>
        <option value="done">✅ Done</option>
      </select>
      {task.description && (
        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
      )}
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}

export default TaskCard;
