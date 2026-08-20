import { Home, Search, PlusSquare, User, Settings, LogOut } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: Search,
    },
    {
      name: "Create Post",
      path: "/create-post",
      icon: PlusSquare,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r bg-white px-4 py-6">
      {/* Logo */}
      <div className="mb-10 px-3">
        <h1 className="text-2xl font-bold">BlogApp</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t pt-4">
        <div className="mb-3 flex items-center gap-3 px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
            <User size={18} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user?.name}</p>

            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-gray-600 hover:bg-gray-100"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
