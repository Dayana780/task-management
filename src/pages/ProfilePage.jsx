import { useState, useEffect } from "react";
import { User, Pencil } from "lucide-react";
import Button from "../components/ui/Button";
import api from "../services/api";
function ProfilePage() {
  const [user, setUser] = useState({ email: "", name: "" });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ boards: 0, tasks: 0, comments: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const handleEditName = () => {
    setEditName(user.name);
    setIsEditing(true);
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      localStorage.setItem("userName", editName);
      setUser({ ...user, name: editName });
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "test@gmail.com";
    const name = localStorage.getItem("userName") || "user";
    setUser({ email, name });

    const fetchStats = async () => {
      try {
        const [boardsRes, tasksRes] = await Promise.all([
          api.get("/boards"),
          api.get("/tasks"),
        ]);

        const boards = boardsRes.data;
        const tasks = tasksRes.data;
        const commentsCount = tasks.reduce((total, task) => {
          const userComments =
            task.comments?.filter((c) => c.author === "user") || [];
          return total + userComments.length;
        }, 0);

        setStats({
          boards: boards.length,
          tasks: tasks.length,
          comments: commentsCount,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
          <User size={20} />
        </div>
        <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
          User Profile
        </h1>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {/* Avatar & name section */}
        <div className="flex flex-col items-center gap-4 border-b border-border pb-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center sm:text-left">
            {isEditing ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="rounded-lg border border-border px-3 py-2 text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
                <div className="flex justify-center gap-2 sm:justify-start">
                  <Button onClick={handleSaveName} className="py-1.5 text-sm">
                    Save
                  </Button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg px-3 py-1.5 text-sm text-muted hover:bg-zinc-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-2">
                <h2 className="text-xl font-semibold text-zinc-900">
                  {user.name}
                </h2>
                <button
                  type="button"
                  onClick={handleEditName}
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Pencil size={14} />
                  Edit
                </button>
              </div>
            )}
            <p className="mt-1 text-sm text-muted">{user.email}</p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-blue-50 p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {stats.boards}
            </div>
            <div className="text-sm text-muted">Boards</div>
          </div>
          <div className="rounded-xl bg-green-50 p-4 text-center">
            <div className="text-2xl font-bold text-success">{stats.tasks}</div>
            <div className="text-sm text-muted">Tasks</div>
          </div>
          <div className="rounded-xl bg-orange-50 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.comments}
            </div>
            <div className="text-sm text-muted">Comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
