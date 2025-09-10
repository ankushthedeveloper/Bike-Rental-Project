"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "@/store";
import Image from "next/image";

type Booking = {
  id: number;
  bikeId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  bike?: {
    brand: string;
    model: string;
    images: string[];
  };
};

interface User {
  name?: string;
  id?: string;
}

export default function MyBookingsPage() {
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`http://localhost:3001/booking/user/${user.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  if (!user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">
          Please log in to view your bookings.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        My Bookings
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-500">
          You have no bookings yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking: any) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
            >
              <h2 className="text-xl font-semibold text-blue-500 mb-2">
                {booking.bike?.brand} {booking.bike?.model}
              </h2>
              <p className="text-gray-700 mb-1">
                From: {new Date(booking.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-1">
                To: {new Date(booking.endDate).toLocaleDateString()}
              </p>
              {/* <p className="text-gray-700 mb-1">
                Total Price: ₹{booking.totalPrice}
              </p> */}
              <img
                src={booking.bikeDetails?.images[0] || ""}
                alt={`${booking.bikeDetails?.brand} ${booking.bikeDetails?.model}`}
                className="h-32 w-full object-cover rounded border mb-4"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
