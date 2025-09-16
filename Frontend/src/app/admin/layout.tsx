"use client"; // This layout now depends on client-side state for the sidebar

import AdminSidebar from "@/components/AdminSidebar";
import { useState } from "react"; // You might need state here if the sidebar width is dynamic

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:ml-64"> {children}</main>
    </div>
  );
}
