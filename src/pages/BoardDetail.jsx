import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  console.log("🔍 id in BoardDetail:", id);
  console.log("🔍 id from useParams:", id);
  console.log("🔍 full URL:", window.location.href);
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );
  console.log("sensors:", sensors);

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

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    console.log("active:", active);
    console.log("over:", over);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    console.log(`Task ${taskId} dropped on ${newStatus}`);

    if (
      newStatus !== "todo" &&
      newStatus !== "in-progress" &&
      newStatus !== "done"
    ) {
      console.log("❌ مقصد معتبر نیست:", newStatus);
      return;
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    console.log(`Current: ${task.status}, New: ${newStatus}`);

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{board?.name}</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <TaskColumn
            id="todo"
            title="📋 To Do"
            status="todo"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
          <TaskColumn
            id="in-progress"
            title="⚡ In Progress"
            status="in-progress"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
          />
          <TaskColumn
            id="done"
            title="✅ Done"
            status="done"
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
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
