import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import Button from "../ui/Button";

export default function Header() {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* سمت راست */}
      <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>

      {/* وسط */}
      <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>

      {/* سمت چپ - گروه اعلان‌ها + پروفایل + خروج */}
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-600">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
            Z
          </div>
          <span className="text-sm text-gray-700">Zohal</span>
        </div>
        <button
          onClick={handleClick}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
        >
          🚪 Logout
        </button>
      </div>
    </header>
  );
}
