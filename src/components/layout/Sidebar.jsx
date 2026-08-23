import { Home, LayoutDashboard, Settings, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/boards", icon: LayoutDashboard, label: "Boards" },
  { to: "/activities", icon: Settings, label: "Activity" },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-zinc-900 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Profile section */}
      <div className="flex items-center justify-between border-b border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <img
            className=" w-full rounded-full border-2 border-none object-cover"
            src="../../../public/taskflow_logo.png"
            alt="Profile"
          />
          {/* <div>
            <p className="text-sm font-semibold">TaskFlow</p>
            <p className="text-xs text-zinc-400">Task Manager</p>
          </div> */}
        </div>
        {/* Close button — mobile only */}
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 hover:bg-zinc-800 lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer link */}
      <div className="border-t border-zinc-800 p-4">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <Settings size={16} />
          Profile
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
