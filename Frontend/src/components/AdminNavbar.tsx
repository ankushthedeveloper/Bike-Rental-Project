"use client";

import { setUser, clearUser } from "@/lib/states/auth.slice";
import { ReduxState } from "@/store";
import { User } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";

const AdminNavbar = () => {
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const userObj = JSON.parse(userString);
        if (userObj) dispatch(setUser(userObj));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    setProfileOpen(false);
    router.push("/login");
  };

  return (
    <>
      <nav className="bg-slate-800 shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between fixed w-full top-0 z-50">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-white">🚲 Bikely</span>
          <span className="text-xs font-semibold text-cyan-200 bg-cyan-900/50 px-2 py-1 rounded-full">
            Admin
          </span>
        </Link>
        {user ? (
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center font-bold text-lg transition-colors"
              aria-label="Open user menu"
            >
              {user.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <UserIcon size={20} />
              )}
            </button>
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl py-2 z-20 origin-top-right animate-scale-in"
                role="menu"
              >
                <div className="px-4 py-2 border-b border-slate-200">
                  <p className="text-sm text-slate-500">Signed in as</p>
                  <p className="font-semibold text-slate-800 truncate">
                    {user.name}
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100"
                    role="menuitem"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                </div>
                <div className="py-1 border-t border-slate-200">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50"
                    role="menuitem"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-semibold text-sm"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
};

export default AdminNavbar;
