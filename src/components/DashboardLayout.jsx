import React, { useState } from "react";
import { GraduationCap, Bell, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Mock components
const Button = ({ variant, className, onClick, children }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      variant === "ghost" ? "hover:bg-slate-700/60 text-slate-300" : ""
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Badge = ({ className, children }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

// Mock navigation and context
const mockUser = {
  name: "John Doe",
  email: "student@example.com"
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = mockUser;
const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout");
  };

  const navigateto = (path) => {
    navigate( path);
    setSidebarOpen(false);
  };

  let role = "student";
  if (user.email.includes("student")) {
    role = "Student";
  } else if (user.email.includes("advisor")) {
    role = "Advisor";
  } else if (user.email.includes("pm")) {
    role = "pm";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-700/60"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Logo */}
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Course Portal</div>
              <div className="text-xs text-slate-300 capitalize">{role}</div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1">
          <button
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/60 text-slate-300 hover:text-white"
            onClick={() => navigateto(`/${role.toLowerCase()}dashboard`)}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/60 text-slate-300 hover:text-white"
            onClick={() => navigateto("/notifications")}
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            <Badge className="bg-emerald-400 text-slate-900">3</Badge>
          </button>

          <button
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/60 text-slate-300 hover:text-white"
            onClick={() => navigateto("/profile")}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </nav>

        {/* Bottom User Info */}
        <div className="p-3 border-t border-slate-700">
          <div className="p-3 bg-slate-700/60 border border-slate-600 rounded-lg mb-2">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-slate-400">{user.email}</div>
          </div>

          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-4 sm:px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-slate-700/60"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5 text-white" />
              </button>

              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">Dashboard</h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Welcome back,{" "}
                  <span className="text-emerald-400 font-medium">{user.name}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="relative p-2 rounded-lg hover:bg-slate-700/60 cursor-pointer"
                onClick={() => navigateto("/notifications")}
              >
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                className="p-2 rounded-lg hover:bg-slate-700/60 flex items-center gap-2 cursor-pointer"
                onClick={() => navigateto("/profile")}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
