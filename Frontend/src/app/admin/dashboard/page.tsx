"use client";

import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type Bike = {
  id: number;
  brand: string;
  model: string;
  price: number;
  images: string[];
};

type Booking = {
  id: number;
  bikeId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  console.log("API Base URL:", baseURL);

  useEffect(() => {
    Promise.all([
      fetch(`${baseURL}/users`, { credentials: "include" }).then((res) =>
        res.json()
      ),
      fetch(`${baseURL}/bikes`, { credentials: "include" }).then((res) =>
        res.json()
      ),
      fetch(`${baseURL}/booking`, { credentials: "include" }).then((res) =>
        res.json()
      ),
    ])
      .then(([usersData, bikesData, bookingsData]) => {
        setUsers(usersData);
        setBikes(bikesData);
        setBookings(bookingsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pl-60 pr-8 w-full">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">
        Admin Dashboard
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading dashboard...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <span className="text-5xl mb-2 text-purple-600">👥</span>
            <span className="text-2xl font-bold text-black">
              {users.length}
            </span>
            <span className="text-gray-600">Total Users</span>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <span className="text-5xl mb-2 text-purple-600">🚲</span>
            <span className="text-2xl font-bold text-black">
              {bikes.length}
            </span>
            <span className="text-gray-600">Total Bikes</span>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <span className="text-5xl mb-2 text-purple-600">📑</span>
            <span className="text-2xl font-bold text-black">
              {bookings.length}
            </span>
            <span className="text-gray-600">Total Bookings</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-purple-700 mb-4">
            Recent Users
          </h2>
          <ul>
            {users.slice(0, 5).map((user) => (
              <li
                key={user.id}
                className="mb-2 flex justify-between items-center"
              >
                <span className="font-semibold text-black">{user.name}</span>
                <span className="text-gray-500 text-sm text-black">
                  {user.email}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-purple-700 mb-4">
            Recent Bookings
          </h2>
          <ul>
            {bookings.slice(0, 5).map((booking) => (
              <li
                key={booking.id}
                className="mb-2 flex justify-between items-center"
              >
                <span className="font-semibold text-black">
                  Bike #{booking.bikeId} by User #{booking.userId}
                </span>
                <span className="text-gray-500 text-sm text-black">
                  {new Date(booking.startDate).toLocaleDateString()} -{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
