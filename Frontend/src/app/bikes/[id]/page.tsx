"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ReduxState } from "@/store";
import { getBikeById } from "@/services/bikes";
import { bookingService } from "@/services/bookings";
import { BikeDetailSkeleton } from "@/components/bikes/BikeDetailSkelton"; // Import the skeleton
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Gauge,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// Using a more specific type for the Bike
type Bike = {
  id: number;
  brand: string;
  model: string;
  year: number;
  rentPerDay: number;
  created_at: string;
  distanceTraveled: number;
  images: string[];
  noOfBikes: number;
  location: string;
};
interface User {
  id?: string;
}

export default function BikeDetailPage() {
  const { id } = useParams();
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  const router = useRouter();

  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  type BookingStatus = "idle" | "loading" | "success" | "error";
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [bookingMessage, setBookingMessage] = useState("");

  const fetchBike = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getBikeById(Number(id));
      if (response.statusCode === 200 && response.data) {
        setBike(response.data);
      } else {
        throw new Error(response.message || "Bike not found.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBike();
  }, [fetchBike]);

  const handleConfirmBooking = async () => {
    if (!startDate || !endDate) {
      setBookingMessage("Please select both start and end dates.");
      setBookingStatus("error");
      return;
    }
    setBookingStatus("loading");
    setBookingMessage("");

    try {
      const data = { bikeId: bike?.id, userId: user?.id, startDate, endDate };
      const res = await bookingService(data);

      if (res.statusCode === 201) {
        setBookingStatus("success");
        setBookingMessage("Booking confirmed! Redirecting...");
        // Redirect AFTER showing success message
        setTimeout(() => {
          setModalOpen(false);
          router.push("/my-bookings");
        }, 2000);
      } else {
        throw new Error(res.message || "Booking failed.");
      }
    } catch (err) {
      setBookingStatus("error");
      setBookingMessage(
        err instanceof Error ? err.message : "Booking failed. Please try again."
      );
    }
  };

  if (loading) {
    return <BikeDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Failed to Load Bike
        </h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!bike) {
    return null;
  }

  const keySpecs = [
    {
      icon: IndianRupee,
      label: "Rent Per Day",
      value: `${bike.rentPerDay.toLocaleString("en-IN")} / day`,
    },
    { icon: Calendar, label: "Model Year", value: bike.year },
    {
      icon: Gauge,
      label: "Distance",
      value: `${bike.distanceTraveled.toLocaleString("en-IN")} km`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-6xl p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src={bike.images[activeImg] || "/placeholder-bike.jpg"}
                alt={`${bike.brand} ${bike.model}`}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex justify-between items-center px-2">
                <button
                  onClick={() =>
                    setActiveImg((p) =>
                      p === 0 ? bike.images.length - 1 : p - 1
                    )
                  }
                  className="bg-white/70 hover:bg-white rounded-full p-2 shadow transition"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() =>
                    setActiveImg((p) =>
                      p === bike.images.length - 1 ? 0 : p + 1
                    )
                  }
                  className="bg-white/70 hover:bg-white rounded-full p-2 shadow transition"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {bike.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative aspect-square rounded-md overflow-hidden transition ${
                    activeImg === idx
                      ? "ring-2 ring-blue-500"
                      : "hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="py-4">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              {bike.brand} {bike.model}
            </h1>
            <p className="text-slate-500 text-lg mt-1 mb-6">{bike.location}</p>

            <div className="grid grid-cols-2 gap-4 border-y border-slate-200 py-6 mb-6">
              {keySpecs.map((spec) => (
                <div key={spec.label} className="flex items-start gap-3">
                  <spec.icon className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500">{spec.label}</p>
                    <p className="font-semibold text-slate-800">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-slate-600 leading-relaxed mb-8">
              A brief description of the bike can go here. This {bike.brand}{" "}
              {bike.model} from {bike.year} is a fantastic choice for navigating
              the streets of Chandigarh. Well-maintained and ready for your next
              adventure!
            </p>

            <button
              onClick={() =>
                user ? setModalOpen(true) : router.push("/login")
              }
              disabled={bike.noOfBikes < 1}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-700 transition-transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
            >
              {bike.noOfBikes < 1 ? "Currently Unavailable" : "Book This Bike"}
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              Added on {new Date(bike.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* --- Booking Modal --- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              Book Your Ride
            </h2>
            <p className="text-slate-500 mb-6">
              {bike.brand} {bike.model}
            </p>

            {bookingStatus === "success" ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-800">
                  {bookingMessage}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleConfirmBooking}
                  disabled={bookingStatus === "loading"}
                  className="w-full mt-6 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:bg-blue-400"
                >
                  {bookingStatus === "loading" ? (
                    <>
                      <Loader2 className="animate-spin mr-2" /> Booking...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
                {bookingStatus === "error" && (
                  <p className="mt-4 text-center text-sm text-red-600">
                    {bookingMessage}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
