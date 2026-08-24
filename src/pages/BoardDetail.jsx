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
import api from "../services/api";
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
      await api.post("/activities", {
        taskId: taskId || null,
        taskTitle,
        action,
        details,
        user: "User",
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Activity logged successfully");
    } catch (error) {
      console.error("❌ Error logging activity:", error);
    }
  };

  const allTags = useMemo(() => {
    return ["all", ...new Set(tasks.flatMap((task) => task.tags || []))];
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  const handleStatusChange = async (taskId, newStatus) => {
    const toastId = toast.loading("Changing status...");

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
        `Task '${task.title}' status changed from ${oldStatusText} to ${newStatusText}`,
      );
      await updateTaskStatus(taskId, newStatus);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
      toast.success("Task status changed successfully", { id: toastId });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error changing task status", { id: toastId });
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
        `Task '${task.title}' was deleted`,
      );
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting task");
    }
  };

  const handleAddComment = async (taskId, newComment) => {
    try {
      const task = tasks.find((t) => String(t.id) === String(taskId));
      if (!task) {
        toast.error("Task not found");
        return;
      }

      const updatedComments = [...(task.comments || []), newComment];

      await api.patch(`/tasks/${taskId}`, {
        comments: updatedComments,
      });

      setTasks(
        tasks.map((t) =>
          String(t.id) === String(taskId)
            ? { ...t, comments: updatedComments }
            : t,
        ),
      );

      await logActivity(
        taskId,
        task.title,
        "comment",
        `New comment added to task '${task.title}'`,
      );

      toast.success("Comment added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error adding comment");
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
        `Task '${response.title}' was created`,
      );
      setTasks([...tasks, response]);
      setIsModalOpen(false);
      toast.success("New task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task");
    }
  };

  // Filter tasks by search, priority, status, tag, due date
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
        const boardResponse = await api.get(`/boards/${id}`);
        setBoard(boardResponse.data);
        const tasksData = await fetchTasksByBoard(id);
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div>
        {/* Board header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            {board?.name}
          </h1>

          <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
        </div>

        {/* Filter bar */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <input
              type="text"
              placeholder="🔍 Search title & description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClass}
            />

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={inputClass}
            >
              <option value="all">All priorities</option>
              <option value="low">✅ Low</option>
              <option value="medium">📌 Medium</option>
              <option value="high">🔥 High</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={inputClass}
            >
              <option value="all">All statuses</option>
              <option value="todo">📋 To Do</option>
              <option value="in-progress">⚡ In Progress</option>
              <option value="done">✅ Done</option>
            </select>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={inputClass}
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === "all" ? "🏷️ All tags" : `#${tag}`}
                </option>
              ))}
            </select>

            <select
              value={filterDueDate}
              onChange={(e) => setFilterDueDate(e.target.value)}
              className={inputClass}
            >
              <option value="all">All dates</option>
              <option value="today">📅 Today</option>
              <option value="week">📅 This week</option>
              <option value="overdue">⚠️ Overdue</option>
              <option value="no-date">No date</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setFilterPriority("all");
              setFilterStatus("all");
              setFilterDueDate("all");
              setSelectedTag("all");
            }}
            className="mt-3 text-sm text-primary transition hover:text-blue-800"
          >
            🗑️ Clear all filters
          </button>
        </div>

        {/* Kanban columns — stack on mobile, 3 cols on desktop */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
