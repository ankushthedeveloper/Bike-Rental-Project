"use client";
import { setUser, clearUser } from "@/lib/states/auth.slice";
import { ReduxState } from "@/store";
import { User } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AdminNavbar = () => {
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userObj = userString ? JSON.parse(userString) : null;
      if (userObj) dispatch(setUser(userObj));
    }
  }, [dispatch]);
  const handleLogout = () => {
    router.push("/my-bookings");
    dispatch(clearUser());
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">
          {" "}
          <span className="text-sm w-full p-2 rounded-full bg-teal-700 text-white font-bold">
            Admin
          </span>
          🚲 Bikely
        </span>
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
        <div className="flex flex-col gap-5">
          <div
            className="bg-teal-800 text-white p-2 rounded"
            onClick={() => setProfile((prev) => !prev)}
          >
            Hi👋,
            <span className="text-yellow-400 font-bold">
              {user && user.name}
            </span>
          </div>
          {profile && (
            <div className=" flex flex-col gap-5 mt-15 bg-teal-900 p-4 rounded shadow-lg absolute h-[150px] ">
              <button
                className="bg-white text-black px-4 py-2 rounded-full"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="bg-white text-black px-4 py-2 rounded-full"
                onClick={() => router.push("/my-bookings")}
              >
                My Bookings
              </button>
            </div>
          )}
        </div>
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
export default AdminNavbar;
