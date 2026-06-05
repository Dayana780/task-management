import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import Button from "../ui/Button";

export default function Header() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "کاربر";

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">TaskFlow</h1>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-600">
          <Bell size={20} />
        </button>

        <Link
          to="/profile"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-700">{userName}</span>
        </Link>
      </div>

      <Button onClick={handleClick} className="bg-red-500 hover:bg-red-600">
        Logout
      </Button>
    </header>
  );
}
