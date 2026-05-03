import BoardCard from "../components/BoardCard";
import Button from "../components/ui/Button";
export default function Dashboard() {
  // داده‌های فرضی برای Boardها
  const boards = [
    { id: 1, name: "Design", taskCount: 5 },
    { id: 2, name: "Dev", taskCount: 8 },
  ];

  // اگر Boardای وجود نداشت
  if (boards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">
          No boards yet. Create your first board to start
        </p>
        <Button type="create" />
      </div>
    );
  }

  // اگر Board وجود داشت (این return اجرا میشه)
  return (
    <div>
      {/* هدر صفحه Dashboard */}

      {/* لیست Boardها با گرید */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
