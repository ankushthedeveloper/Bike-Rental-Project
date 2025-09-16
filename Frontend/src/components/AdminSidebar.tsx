"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Bike,
  BookCopy,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/bikes", label: "Bikes", icon: Bike },
  { href: "/admin/bookings", label: "Bookings", icon: BookCopy },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-slate-50 shadow-lg z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16">
          <span
            className={`font-bold text-xl transition-opacity duration-200 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100"
            }`}
          >
            Bikely Admin
          </span>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-lg font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <item.icon size={22} />
                <span className={`${isCollapsed ? "hidden" : "block"}`}>
                  {item.label}
                </span>
                {isCollapsed && (
                  <span className="absolute left-full ml-4 px-2 py-1 text-sm bg-slate-800 text-white rounded-md invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 mt-auto border-t border-slate-800">
          <button
            className={`flex items-center w-full gap-4 p-3 rounded-lg font-semibold transition-colors duration-200 group relative text-slate-400 hover:bg-red-900/50 hover:text-red-400 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={22} />
            <span className={`${isCollapsed ? "hidden" : "block"}`}>
              Logout
            </span>
            {isCollapsed && (
              <span className="absolute left-full ml-4 px-2 py-1 text-sm bg-slate-800 text-white rounded-md invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
