"use client";

import React, { useEffect, useState } from "react";
import { LuDelete } from "react-icons/lu";
import { MdAssignment, MdDelete } from "react-icons/md";

type Booking = {
  id: number;
  bikeId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  manager?: string;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/booking", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-8 pl-56 pr-8 min-h-screen bg-gray-50 w-full">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">All Bookings</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading bookings...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-purple-100 text-purple-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Bike ID</th>
                <th className="py-3 px-4 text-left">User ID</th>
                <th className="py-3 px-4 text-left">Start Date</th>
                <th className="py-3 px-4 text-left">End Date</th>
                <th className="py-3 px-4 text-left">Total Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Manager</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b hover:bg-purple-50 text-black"
                >
                  <td className="py-2 px-4">{booking.id}</td>
                  <td className="py-2 px-4">{booking.bikeId}</td>
                  <td className="py-2 px-4">{booking.userId}</td>
                  <td className="py-2 px-4">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">₹{booking.totalPrice}</td>
                  <td className="py-2 px-4">{booking.status}</td>
                  <td className="py-2 px-4">{booking.manager || "N/A"}</td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-4">
                      <div
                        className="text-red-600 hover:text-red-800 text-lg cursor-pointer"
                        // onClick={() => handleDeleteBooking(booking.id)}
                      >
                        <MdDelete />
                      </div>

                      <div
                        className="text-blue-600 hover:text-red-800 text-lg cursor-pointer"
                        // onClick={() => handleAssignment(booking.id)}
                      >
                        <MdAssignment />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
