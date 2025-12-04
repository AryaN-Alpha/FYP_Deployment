import React, { useState } from "react";
import { GraduationCap, Bell, User, LogOut, LayoutDashboard, BarChart3 } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';



export default function DashboardLayout({  children }) {
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const handleLogout = () => {
    setUser(null);              // clear context
    localStorage.removeItem("token");   // remove token
    navigate("/login");         // redirect
  };
  let role= "student"
      if(user.email.includes("student")) {
        role = "Student"
      }else if(user.email.includes("advisor")) {
        role = "Advisor"
      } else if(user.email.includes("pm")) {
        role = "Program Manager"
      }


  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white flex flex-col shadow-xl">

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
          onClick={() => navigate(`/${role.toLowerCase()}dashboard`)}

          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/60 text-slate-300 hover:text-white"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="w-5 h-5 " />
            <span>Notifications</span>
            <Badge className="bg-emerald-400 text-slate-900">3</Badge>
          </button>

          <button
            className="w-full flex cursor-pointer items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/60 text-slate-300 hover:text-white"
            onClick={() => navigate("/profile")}
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
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-slate-300">
                Welcome back,{" "}
                <span className="text-emerald-400 font-medium">{user.name}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-slate-700/60 cursor-pointer" onClick={()=>navigate("/notifications")}>
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2 rounded-lg hover:bg-slate-700/60 flex items-center gap-2 cursor-pointer" onClick={()=>navigate("/profile")}>
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
