import { useState, useEffect } from "react";

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
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail") || "test@gmail.com";
    const name = localStorage.getItem("userName") || "کاربر";

    setUser({ email, name });
    const fetchStats = async () => {
      try {
        const [boardsRes, tasksRes] = await Promise.all([
          fetch("http://localhost:3001/boards"),
          fetch("http://localhost:3001/tasks"),
        ]);
        const boards = await boardsRes.json();
        const tasks = await tasksRes.json();

        const commentsCount = tasks.reduce((total, task) => {
          const userComments =
            task.comments?.filter((c) => c.author === "کاربر") || [];
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
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">👤 پروفایل کاربر</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border rounded px-2 py-1 text-lg"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  ذخیره
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                >
                  انصراف
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <button
                  onClick={handleEditName}
                  className="text-blue-500 text-sm hover:underline"
                >
                  ✏️ ویرایش
                </button>
              </div>
            )}
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.boards}
              </div>
              <div className="text-sm text-gray-500">بردها</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.tasks}
              </div>
              <div className="text-sm text-gray-500">تسک‌ها</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.comments}
              </div>
              <div className="text-sm text-gray-500">کامنت‌ها</div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
