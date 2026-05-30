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

  // Stateها
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stateهای فیلتر
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDueDate, setFilterDueDate] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  // گرفتن لیست یکتای همه تگ‌ها (بعد از tasks تعریف شده)
  const allTags = useMemo(() => {
    return ["all", ...new Set(tasks.flatMap((task) => task.tags || []))];
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  // تغییر وضعیت تسک
  const handleStatusChange = async (taskId, newStatus) => {
    const toastId = toast.loading("وضعیت در حال تغییر...");

    try {
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

  // حذف تسک
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success("تسک با موفقیت حذف شد");
    } catch (error) {
      console.error(error);
      toast.error("خطا در حذف تسک");
    }
  };

  // درگ و دراپ
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

  // اضافه کردن تسک جدید
  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      setTasks([...tasks, response]);
      setIsModalOpen(false);
      toast.success("تسک جدید اضافه شد");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("خطا در اضافه کردن تسک");
    }
  };

  // فیلتر کردن تسک‌ها
  const filteredTasks = tasks.filter((task) => {
    // جستجو در عنوان و توضیحات
    const matchesSearch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // فیلتر تگ
    const matchesTag =
      selectedTag === "all" || (task.tags && task.tags.includes(selectedTag));

    // فیلتر اولویت
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    // فیلتر وضعیت
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;

    // فیلتر تاریخ
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

  // گرفتن اطلاعات برد و تسک‌ها از سرور
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
        {/* هدر */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{board?.name}</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
        </div>

        {/* بخش فیلترها */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* جستجو */}
            <input
              type="text"
              placeholder="🔍 جستجو در عنوان و توضیحات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md px-3 py-2"
            />

            {/* فیلتر اولویت */}
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

            {/* فیلتر وضعیت */}
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

            {/* فیلتر تگ */}
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

            {/* فیلتر تاریخ */}
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

          {/* دکمه ریست */}
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

        {/* سه ستون تسک‌ها */}
        <div className="grid grid-cols-3 gap-4">
          <TaskColumn
            id="todo"
            title="📋 To Do"
            status="todo"
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
          <TaskColumn
            id="in-progress"
            title="⚡ In Progress"
            status="in-progress"
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
          <TaskColumn
            id="done"
            title="✅ Done"
            status="done"
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
        </div>

        {/* مودال اضافه کردن تسک */}
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
