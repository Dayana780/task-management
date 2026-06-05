import { useState, useEffect } from "react";
import { Plus, LayoutGrid } from "lucide-react";
import { fetchBoards, createBoard } from "../services/boardService";
import BoardCard from "../components/BoardCard";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCreateBoard = async (newBoard) => {
    try {
      await createBoard({ name: newBoard.name, color: newBoard.color });
      const updatedBoards = await fetchBoards();
      setBoards(updatedBoards);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board");
    }
  };

  // Loading spinner
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Empty state
  if (boards.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-primary">
          <LayoutGrid size={32} />
        </div>
        <h2 className="text-xl font-semibold text-zinc-800">No boards yet</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Create your first board to start organizing tasks
        </p>
        <Button onClick={() => setIsModalOpen(true)} className="mt-6">
          <span className="flex items-center gap-2">
            <Plus size={18} />
            Create Board
          </span>
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateBoard}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">My Boards</h1>
          <p className="mt-1 text-sm text-muted">{boards.length} board(s)</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <span className="flex items-center gap-2">
            <Plus size={18} />
            Create Board
          </span>
        </Button>
      </div>

      {/* Board grid — 1 col mobile, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
