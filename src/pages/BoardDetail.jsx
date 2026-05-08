import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import Button from "../components/ui/Button";
import AddTaskModal from "../components/ui/AddTaskModal";
import TaskColumn from "../components/features/TaskColumn";

function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("خطا در تغییر وضعیت");
    }
  };
  // تابع اضافه کردن تسک جدید
  const handleAddTask = async (newTask) => {
    try {
      const response = await api.post("/tasks", newTask);
      setTasks([...tasks, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("خطا در اضافه کردن تسک");
    }
  };

  // گرفتن داده‌ها از سرور
  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardResponse = await api.get(`/boards/${id}`);
        setBoard(boardResponse.data);

        const tasksResponse = await api.get(`/tasks?boardId=${id}`);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6">
      {/* هدر با دکمه Add Task */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{board?.name}</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
      </div>

      {/* سه ستون تسک‌ها */}
      <div className="grid grid-cols-3 gap-4">
        <TaskColumn
          title="📋 To Do"
          status="todo"
          tasks={tasks}
          onStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="⚡ In Progress"
          status="in-progress"
          tasks={tasks}
          onStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="✅ Done"
          status="done"
          tasks={tasks}
          onStatusChange={handleStatusChange}
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
  );
}

export default BoardDetail;
