"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ReduxState } from "@/store";

type Bike = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  created_at: string;
  distanceTraveled: number;
  images: string[];
};
interface User {
  name?: string;
  id?: string;
}

export default function BikeDetailPage() {
  const { id } = useParams();
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  useEffect(() => {
    fetch(`${baseURL}/bikes/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setBike(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBook = () => {
    if (!user) router.push("/login");
    else {
      setModalOpen(true);
      setBookingMessage("");
    }
  };
  console.log(bike);

  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) {
      setBookingMessage("Please select both start and end dates.");
      return;
    }
    setBookingLoading(true);
    setBookingMessage("");
    router.push("/my-bookings");
    try {
      const res = await fetch(`${baseURL}/booking/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user?.id,
          bikeId: id,
          startDate,
          endDate,
          totalPrice: bike ? bike.price : 0,
        }),
      });
      if (res.ok) {
        setBookingMessage("Booking confirmed!");
        setModalOpen(false);
      } else {
        const data = await res.json();
        setBookingMessage(data.message || "Booking failed.");
      }
    } catch {
      setBookingMessage("Booking failed. Please try again.");
    }
    setBookingLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading bike details...</div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Bike not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="relative flex flex-col items-center">
            <img
              src={bike?.images[activeImg] || ""}
              alt={`${bike.brand} ${bike.model}`}
              className="h-64 w-full object-cover rounded-lg border mb-2"
            />
            <div className="flex gap-2 mt-2 justify-center">
              {bike.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`h-16 w-16 object-cover rounded border cursor-pointer ${
                    activeImg === idx ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setActiveImg(idx)}
                />
              ))}
            </div>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2"
              onClick={() =>
                setActiveImg((prev) =>
                  prev === 0 ? bike.images.length - 1 : prev - 1
                )
              }
            >
              ◀
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2"
              onClick={() =>
                setActiveImg((prev) =>
                  prev === bike.images.length - 1 ? 0 : prev + 1
                )
              }
            >
              ▶
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-blue-600 mb-2">
          {bike.brand} {bike.model}
        </h1>
        <p className="text-gray-700 mb-1">Year: {bike.year}</p>
        <p className="text-gray-700 mb-1">Price: ₹{bike.price}</p>
        <p className="text-gray-700 mb-1">
          Distance Traveled: {bike.distanceTraveled} km
        </p>
        <p className="text-gray-400 text-xs mb-4">
          Added on {new Date(bike.created_at).toLocaleDateString()}
        </p>
        <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Book This Bike
        </button>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
              Book {bike.brand} {bike.model}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <button
              onClick={handleConfirmBooking}
              disabled={bookingLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </button>
            {bookingMessage && (
              <div className="mt-4 text-center text-sm text-red-600">
                {bookingMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
