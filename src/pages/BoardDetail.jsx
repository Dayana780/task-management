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
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // تغییر وضعیت تسک
  const handleStatusChange = async (taskId, newStatus) => {
    toast.info("وضعیت در حال تغییر...");
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
      toast.success("وضعیت تسک با موفقیت تغییر کرد");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("خطا در تغییر وضعیت");
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{board?.name}</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TaskColumn
          title="📋 To Do"
          status="todo"
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
        <TaskColumn
          title="⚡ In Progress"
          status="in-progress"
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
        <TaskColumn
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
  );
}

export default BoardDetail;
