"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ReduxState } from "@/types/rootState";

const Navbar = () => {
  const user = useSelector((state: ReduxState) => state.user.user);
  console.log("User from Redux State:", user);
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">🚲 Bikely</span>
      </div>
      <ul className="flex gap-25 items-center">
        <li>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/bikes"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Bikes
          </Link>
        </li>
        <li>
          <Link
            href="/about-us"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/contact-us"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Contact Us
          </Link>
        </li>
      </ul>
      {user ? (
        <div className="bg-teal-200 text-white p-4 br-3">Hi {user.name}</div>
      ) : (
        <div>
          <Link
            href="/sign-up"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Lets Go
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
