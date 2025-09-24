"use client";

import { getUserService } from "@/services/admin/users";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import {
  ShieldCheck,
  UserCog,
  User as UserIcon,
  Trash2,
  Pencil,
  AlertTriangle,
  Users as UsersIcon,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import { User, UserRole } from "@/types/user";
import UserTableSkeleton from "@/components/Skeletons/UsersTableSkeleton";

const RoleBadge = ({ role }: { role: UserRole }) => {
  const roleStyles = {
    admin: {
      icon: ShieldCheck,
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
    manager: {
      icon: UserCog,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    user: {
      icon: UserIcon,
      bgColor: "bg-slate-100",
      textColor: "text-slate-800",
    },
  };
  const { icon: Icon, ...styles } = roleStyles[role] || roleStyles.user;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles.bgColor} ${styles.textColor}`}
    >
      <Icon size={14} />
      <span className="capitalize">{role}</span>
    </span>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUserService();
      if (res.statusCode === 200) {
        setUsers(res.data || []);
      } else if (res.statusCode === 403) {
        toast.error(res.message || "You are not authorized to view this page.");
        router.push("/");
      } else {
        throw new Error(res.message || "Failed to fetch users.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
      toast.success(`User "${userToDelete.name}" deleted successfully.`);
      setUserToDelete(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete user."
      );
    }
  };

  const renderContent = () => {
    if (loading) {
      return <UserTableSkeleton />;
    }
    if (error) {
      return (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-lg font-medium text-slate-900">
            Failed to load data
          </h3>
          <p className="mt-1 text-sm text-slate-500">{error}</p>
        </div>
      );
    }
    if (users.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <UsersIcon className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-lg font-medium text-slate-900">
            No Users Found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            There are currently no users to display.
          </p>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-slate-100">
            <tr className="text-slate-600 text-sm font-semibold">
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 text-slate-700">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-200 rounded-full font-semibold text-slate-600">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">
                        {user.name}
                      </div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <RoleBadge role={user.role} />
                </td>
                <td className="py-3 px-4 text-sm">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      aria-label="Edit user"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => setUserToDelete(user)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      aria-label="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add User
          </button>
        </div>
      </div>

      {renderContent()}

      {userToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Delete User
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete the user "{userToDelete.name}"?
                This action cannot be undone.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="inline-flex justify-center w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                className="inline-flex justify-center w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
