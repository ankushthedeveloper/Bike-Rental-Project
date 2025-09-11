"use client";
import { useSelector } from "react-redux";
import { ReduxState } from "@/store";
import { User } from "@/types/user";
import Navbar from "../Navbar";
import AdminNavbar from "../AdminNavbar";
import ManagerNavbar from "../ManagerNavbar";

export default function NavbarWrapper() {
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  if (user?.role === "admin") return <AdminNavbar />;
  else if (user?.role === "manager") return <ManagerNavbar />;
  return <Navbar />;
}
