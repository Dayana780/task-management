import { useState } from "react";
import Button from "./Button";

export default function AddTaskModal({ isOpen, onClose, onAdd, boardId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) return null;

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
      });
      // reset فرم
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setDueDate("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit}>
          {/* فیلد عنوان */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              autoFocus
              required
            />
          </div>

          {/* فیلد توضیحات */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              rows="3"
            />
          </div>

          {/* فیلد وضعیت */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* فیلد اولویت */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">اولویت</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="low">✅ کم</option>
              <option value="medium">📌 متوسط</option>
              <option value="high">🔥 بالا</option>
            </select>
          </div>

          {/* فیلد تاریخ سررسید */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">تاریخ سررسید</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* دکمه‌ها */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
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
