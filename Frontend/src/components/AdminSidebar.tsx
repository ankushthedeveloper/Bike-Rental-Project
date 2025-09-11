import Link from "next/link";
import React from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/bikes", label: "Bikes", icon: "🚲" },
  { href: "/admin/bookings", label: "Bookings", icon: "📑" },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 h-screen w-50 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 shadow-lg pt-20 z-20 flex flex-col">
      <ul className="flex-1 w-full space-y-2 px-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center gap-3 py-3 px-4 rounded-lg font-semibold text-white hover:bg-purple-400 hover:text-purple-900 transition-all duration-200 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="px-4 pb-6 mt-auto">
        <button className="w-full py-2 rounded-lg bg-purple-700 hover:bg-purple-900 text-white font-bold transition">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
