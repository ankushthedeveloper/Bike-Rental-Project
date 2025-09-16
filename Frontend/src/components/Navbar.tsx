"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "@/lib/states/auth.slice";
import { useRouter, usePathname } from "next/navigation";
import { ReduxState } from "@/store";
import { Menu, X, User as UserIcon, LogOut, Briefcase } from "lucide-react";

interface User {
  name?: string;
}

const Navbar = () => {
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Effect to load user from localStorage
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString && userString !== "undefined") {
      try {
        const userObj = JSON.parse(userString);
        if (userObj) dispatch(setUser(userObj));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  // Effect to handle clicking outside the profile dropdown
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
    setProfileOpen(false); // Close dropdown on logout
    router.push("/"); // Redirect to home after logout
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bikes", label: "Bikes" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
  ];

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between fixed w-full z-50 border-b border-slate-200/60">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">🚲 Bikely</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons & Profile */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {user.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon size={18} />
                  )}
                </div>
                <span className="font-semibold text-slate-700 hidden lg:block">
                  Hi, {user.name}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20 origin-top-right animate-scale-in">
                  <Link
                    href="/my-bookings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100"
                  >
                    <Briefcase size={16} /> My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-slate-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/sign-up"
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-px"
            >
              Let's Go
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-slate-700"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="text-2xl font-bold text-blue-600">Bikely</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-500 hover:text-slate-800"
            >
              <X size={28} />
            </button>
          </div>
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium transition-colors duration-300 ${
                    pathname === link.href
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t pt-6">
            {user ? (
              <>
                <Link
                  href="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-left flex items-center gap-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  <Briefcase size={16} /> My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 text-left flex items-center gap-3 py-2 text-red-500 hover:bg-slate-100 rounded-md"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-blue-600 text-white px-5 py-3 rounded-full hover:bg-blue-700 transition font-semibold"
              >
                Let's Go
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
