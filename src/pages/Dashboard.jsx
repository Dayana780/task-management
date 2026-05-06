import { useState, useEffect } from "react";
import api from "../services/api";
import BoardCard from "../components/BoardCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دریافت لیست بردها از سرور
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await api.get("/boards");
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  // تابع اضافه کردن برد جدید
  const handleCreateBoard = async (newBoard) => {
    try {
      await api.post("/boards", {
        name: newBoard.name,
        color: newBoard.color,
      });

      // بعد از اضافه شدن، لیست رو دوباره از سرور میگیریم
      const updatedResponse = await api.get("/boards");
      setBoards(updatedResponse.data);

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board");
    }
  };

  // اگر در حال لودینگ باشه
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // اگر هیچ بردی وجود نداشته باشه
  if (boards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">
          No boards yet. Create your first board to start
        </p>
        <Button onClick={() => setIsModalOpen(true)}>Create Board</Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateBoard}
        />
      </div>
    );
  }

  // نمایش لیست بردها
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Boards</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Board</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
}
