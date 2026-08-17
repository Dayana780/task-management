import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, LogOut } from "lucide-react";
import Button from "../ui/Button";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "user";

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold text-primary sm:text-xl">TaskFlow</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="rounded-lg p-2 text-muted transition hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <Link
          to="/profile"
          className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-zinc-50"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          {/* Hide name on very small screens */}
          <span className="hidden text-sm text-zinc-700 sm:inline">
            {userName}
          </span>
        </Link>

        <Button
          onClick={handleLogout}
          className="hidden bg-red-500 px-3 py-1.5 text-sm hover:bg-red-600 sm:inline-flex"
        >
          Logout
        </Button>
        {/* Icon-only logout on mobile */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg p-2 text-red-500 hover:bg-red-50 sm:hidden"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
