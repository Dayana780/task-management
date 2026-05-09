import {
  Home,
  LayoutDashboard,
  // CheckSquare,
  // Calendar,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <ul className="space-y-2 flex flex-col justify-center items-start">
        <li className="flex justify-center w-full mb-4">
          <img
            className="w-32 h-32 rounded-full"
            src="patrik.jpg"
            alt="Profile"
          />
        </li>
        <li>
          <Link
            to="/dashboard"
            className="p-2 hover:bg-gray-700 rounded flex items-center gap-2 w-full"
          >
            <Home size={18} /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/boards"
            className="p-2 hover:bg-gray-700 rounded flex items-center gap-2 w-full"
          >
            <LayoutDashboard size={18} /> Boards
          </Link>
        </li>
        {/* <li>
          <Link
            to="/tasks"
            className="p-2 hover:bg-gray-700 rounded flex items-center gap-2 w-full"
          >
            <CheckSquare size={18} /> Tasks
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className="p-2 hover:bg-gray-700 rounded flex items-center gap-2 w-full"
          >
            <Calendar size={18} /> Calendar
          </Link>
        </li> */}
        <li>
          <Link
            to="/settings"
            className="p-2 hover:bg-gray-700 rounded flex items-center gap-2 w-full"
          >
            <Settings size={18} /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
