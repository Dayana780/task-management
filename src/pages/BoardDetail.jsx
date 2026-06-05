import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import {
  fetchTasksByBoard,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService";
import Button from "../components/ui/Button";
import AddTaskModal from "../components/ui/AddTaskModal";
import TaskColumn from "../components/features/TaskColumn";

function BoardDetail() {
  const { id } = useParams();

  // State
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDueDate, setFilterDueDate] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const logActivity = async (taskId, taskTitle, action, details) => {
    console.log("📝 Logging activity:", { taskId, taskTitle, action });
    try {
      const response = await fetch("http://localhost:3001/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: taskId || null,
          taskTitle,
          action,
          details,
          user: "کاربر",
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log("✅ Activity logged successfully");
      } else {
        console.error("❌ Failed to log activity:", response.status);
      }
    } catch (error) {
      console.error("❌ Error logging activity:", error);
    }
  };
  const allTags = useMemo(() => {
    return ["all", ...new Set(tasks.flatMap((task) => task.tags || []))];
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  const handleStatusChange = async (taskId, newStatus) => {
    const toastId = toast.loading("وضعیت در حال تغییر...");

    try {
      const task = tasks.find((t) => t.id === taskId);
      const oldStatusText =
        task.status === "todo"
          ? "To Do"
          : task.status === "in-progress"
            ? "In Progress"
            : "Done";
      const newStatusText =
        newStatus === "todo"
          ? "To Do"
          : newStatus === "in-progress"
            ? "In Progress"
            : "Done";

      await logActivity(
        taskId,
        task.title,
        "status_change",
        `وضعیت تسک '${task.title}' از ${oldStatusText} به ${newStatusText} تغییر کرد`,
      );
      await updateTaskStatus(taskId, newStatus);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
      toast.success("وضعیت تسک با موفقیت تغییر کرد", { id: toastId });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("خطا در تغییر وضعیت", { id: toastId });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const task = tasks.find((t) => t.id === taskId);
      await logActivity(
        taskId,
        task.title,
        "delete",
        `تسک '${task.title}' حذف شد`,
      );
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success("تسک با موفقیت حذف شد");
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف تسک");
    }
  };
  const handleAddComment = async (taskId, newComment) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      await logActivity(
        taskId,
        task.title,
        "comment",
        `نظر جدید روی تسک '${task.title}' اضافه شد`,
      );
      const updatedComments = [...(task.comments || []), newComment];

      await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments: updatedComments }),
      });

      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, comments: updatedComments } : t,
        ),
      );

      toast.success("نظر اضافه شد");
    } catch (error) {
      console.error(error);
      toast.error("خطا در اضافه کردن نظر");
    }
  };
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    if (
      newStatus !== "todo" &&
      newStatus !== "in-progress" &&
      newStatus !== "done"
    ) {
      return;
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (task.status !== newStatus) {
      await handleStatusChange(taskId, newStatus);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      await logActivity(
        response.id,
        response.title,
        "create",
        `تسک '${response.title}' ایجاد شد`,
      );
      setTasks([...tasks, response]);
      setIsModalOpen(false);
      toast.success("تسک جدید اضافه شد");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("خطا در اضافه کردن تسک");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag =
      selectedTag === "all" || (task.tags && task.tags.includes(selectedTag));

    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;

    let matchesDueDate = true;
    if (filterDueDate !== "all") {
      if (filterDueDate === "no-date") {
        matchesDueDate = !task.dueDate;
      } else if (filterDueDate === "overdue") {
        matchesDueDate =
          task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), "day");
      } else if (filterDueDate === "today") {
        matchesDueDate =
          task.dueDate && dayjs(task.dueDate).isSame(dayjs(), "day");
      } else if (filterDueDate === "week") {
        matchesDueDate =
          task.dueDate &&
          dayjs(task.dueDate).isAfter(dayjs(), "day") &&
          dayjs(task.dueDate).isBefore(dayjs().add(7, "day"), "day");
      }
    }

    return (
      matchesSearch &&
      matchesPriority &&
      matchesStatus &&
      matchesDueDate &&
      matchesTag
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardResponse = await fetch(`http://localhost:3001/boards/${id}`);
        const boardData = await boardResponse.json();
        setBoard(boardData);

        const tasksData = await fetchTasksByBoard(id);
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
        toast.error("خطا در دریافت اطلاعات: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{board?.name}</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="🔍 جستجو در عنوان و توضیحات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-2"
            />

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">همه اولویت‌ها</option>
              <option value="low">✅ کم</option>
              <option value="medium">📌 متوسط</option>
              <option value="high">🔥 بالا</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="todo">📋 To Do</option>
              <option value="in-progress">⚡ In Progress</option>
              <option value="done">✅ Done</option>
            </select>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === "all" ? "🏷️ همه تگ‌ها" : `#${tag}`}
                </option>
              ))}
            </select>

            <select
              value={filterDueDate}
              onChange={(e) => setFilterDueDate(e.target.value)}
              className="border rounded-md px-3 py-2"
            >
              <option value="all">همه تاریخ‌ها</option>
              <option value="today">📅 امروز</option>
              <option value="week">📅 این هفته</option>
              <option value="overdue">⚠️ تاریخ گذشته</option>
              <option value="no-date">بدون تاریخ</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setFilterPriority("all");
              setFilterStatus("all");
              setFilterDueDate("all");
              setSelectedTag("all");
            }}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800"
          >
            🗑️ پاک کردن همه فیلترها
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TaskColumn
            id="todo"
            title="📋 To Do"
            status="todo"
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onAddComment={handleAddComment}
          />
          <TaskColumn
            id="in-progress"
            title="⚡ In Progress"
            status="in-progress"
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onAddComment={handleAddComment}
          />
          <TaskColumn
            id="done"
            title="✅ Done"
            status="done"
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onAddComment={handleAddComment}
          />
        </div>

        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTask}
          boardId={id}
        />
      </div>
    </DndContext>
  );
}

export default BoardDetail;
