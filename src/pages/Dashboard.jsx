import { useState, useEffect } from "react";
import { fetchBoards, createBoard } from "../services/boardService";
import BoardCard from "../components/BoardCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دریافت لیست بردها
  useEffect(() => {
    const loadBoards = async () => {
      try {
        const data = await fetchBoards();
        setBoards(data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBoards();
  }, []);

  // ساخت برد جدید
  const handleCreateBoard = async (newBoard) => {
    try {
      await createBoard({
        name: newBoard.name,
        color: newBoard.color,
      });
      const updatedBoards = await fetchBoards();
      setBoards(updatedBoards);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board");
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

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
