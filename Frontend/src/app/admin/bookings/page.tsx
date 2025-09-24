"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ClipboardX,
  RefreshCw,
} from "lucide-react";
import { MdDone } from "react-icons/md";
import { markBookingAsCompleted } from "@/services/admin/bookings";
import { toast } from "react-toastify";
import { deleteBooking, getAllBookings } from "@/services/admin/bookings";
import { Booking, BookingStatus } from "@/types/booking";

const StatusBadge = ({ status }: { status: BookingStatus }) => {
  const statusStyles: Record<
    BookingStatus,
    { bgColor: string; textColor: string; icon: React.ReactNode }
  > = {
    active: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: <Clock size={14} />,
    },
    completed: {
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      icon: <CheckCircle size={14} />,
    },
  };

  const style = statusStyles[status] || {};

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bgColor} ${style.textColor}`}
    >
      {style.icon}
      {status}
    </span>
  );
};

const BookingTableSkeleton = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead>
        <tr className="bg-slate-100 text-slate-600">
          {Array.from({ length: 8 }).map((_, i) => (
            <th key={i} className="py-3 px-4 text-left"></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index} className="border-b">
            {Array.from({ length: 8 }).map((_, i) => (
              <td key={i} className="py-4 px-4">
                <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);
  const [bookingToComplete, setBookingToComplete] = useState<Booking | null>(
    null
  );

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCompleteBooking = async () => {
    if (!bookingToComplete) return;
    try {
      const response = await markBookingAsCompleted(bookingToComplete.id);
      const updatedBooking: Booking =
        response && response.data && response.data.id
          ? response.data
          : response;
      setBookings((prev) =>
        prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
      );
      setBookingToComplete(null);
      toast.success("Booking marked as completed.");
    } catch (error) {
      toast.error("Failed to mark booking as completed.");
    }
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;

    try {
      const res = await deleteBooking(bookingToDelete.id);
      if (res.status !== 200) throw new Error("Failed to delete booking.");

      setBookings((prev) => prev.filter((b) => b.id !== bookingToDelete.id));
      setBookingToDelete(null); // Close modal on success
      // Optionally, show a success toast here
    } catch (error) {
      console.error("Error deleting booking:", error);
      // Optionally, show an error toast here
    }
  };

  // --- Render Logic ---

  const renderContent = () => {
    if (loading) {
      return <BookingTableSkeleton />;
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

    if (bookings.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <ClipboardX className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-2 text-lg font-medium text-slate-900">
            No Bookings Found
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            There are currently no bookings to display.
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-slate-100">
            <tr className="text-slate-600 text-sm font-semibold">
              <th className="py-3 px-4 text-left">Booking ID</th>
              <th className="py-3 px-4 text-left">Bike / User</th>
              <th className="py-3 px-4 text-left">Duration</th>
              <th className="py-3 px-4 text-left">Total Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Manager</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50 text-slate-700">
                <td className="py-3 px-4 font-mono text-sm">#{booking.id}</td>
                <td className="py-3 px-4 text-sm">
                  <div>Bike ID: {booking.bikeId}</div>
                  <div className="text-xs text-slate-500">
                    User ID: {booking.userId}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                  <div className="text-xs text-slate-500">
                    to {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold">
                  ₹{booking.totalPrice?.toFixed(2)}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={booking.status} />
                </td>
                <td className="py-3 px-4 text-sm">
                  {booking.manager || "N/A"}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setBookingToDelete(booking)}
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    aria-label="Delete booking"
                  >
                    <Trash2 size={18} />
                  </button>
                  {booking.status === "active" && (
                    <button
                      onClick={() => setBookingToComplete(booking)}
                      className="p-2 text-slate-500 hover:text-green-600 hover:bg-green-100 rounded-full transition-colors"
                      aria-label="Complete booking"
                    >
                      <MdDone size={18} />
                    </button>
                  )}
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
        <h1 className="text-3xl font-bold text-slate-800">All Bookings</h1>
        <button
          onClick={fetchBookings}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {renderContent()}

      {bookingToDelete && (
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
                Delete Booking
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to delete booking #{bookingToDelete.id}?
                This action cannot be undone.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBookingToDelete(null)}
                className="inline-flex justify-center w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBooking}
                className="inline-flex justify-center w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {bookingToComplete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <MdDone className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Complete Booking
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Are you sure you want to mark booking #{bookingToComplete.id} as
                completed ? This action cannot be undone.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBookingToComplete(null)}
                className="inline-flex justify-center w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCompleteBooking}
                className="inline-flex justify-center w-full rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
              >
                Confirm Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
