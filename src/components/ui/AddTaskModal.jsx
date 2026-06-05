import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";

export default function AddTaskModal({ isOpen, onClose, onAdd, boardId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState([]);

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        status,
        boardId: parseInt(boardId),
        priority,
        dueDate,
        tags,
      });

      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setDueDate("");
      setTags([]);
    }
  };

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-xl">
        {/* Modal header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">Add New Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted hover:bg-zinc-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title field */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Enter task title"
              autoFocus
              required
            />
          </div>

          {/* Description field */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
              placeholder="Enter task description"
              rows="3"
            />
          </div>

          {/* Status & priority — side by side on sm+ */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={inputClass}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={inputClass}
              >
                <option value="low">✅ Low</option>
                <option value="medium">📌 Medium</option>
                <option value="high">🔥 High</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "study", label: "study 📚" },
                { id: "job", label: "job 💼" },
                { id: "feature", label: "feature ✨" },
                { id: "bug", label: "bug 🐛" },
              ].map(({ id, label }) => (
                <label
                  key={id}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition ${
                    tags.includes(id)
                      ? "border-primary bg-blue-50 text-primary"
                      : "border-border bg-zinc-50 text-zinc-600 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={tags.includes(id)}
                    onChange={() => toggleTag(id)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Due date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100"
            >
              Cancel
            </button>
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
