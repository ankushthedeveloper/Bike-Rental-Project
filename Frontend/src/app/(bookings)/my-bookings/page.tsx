"use client";

import React, { useEffect, useState, useMemo, FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bike as BikeIcon,
} from "lucide-react";
import { getActiveBookings, getCompletedBookings } from "@/services/bookings";

interface BikeDetails {
  brand: string;
  model: string;
  images: string[];
  rentPerDay: number;
}

interface Booking {
  _id: string;
  bikeDetails: BikeDetails;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "active" | "completed";
}

interface User {
  name?: string;
  id?: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getBookingStatus = (status: "active" | "completed") => {
  const now = new Date();

  if (status === "completed") {
    return {
      text: "Completed",
      color: "bg-gray-500",
      icon: <CheckCircle size={14} />,
    };
  }
  if (status === "active") {
    return { text: "Active", color: "bg-green-500", icon: <Clock size={14} /> };
  }
  return {
    text: "Upcoming",
    color: "bg-blue-500",
    icon: <Calendar size={14} />,
  };
};

const InfoBlock: FC<{
  icon: ReactNode;
  label: string;
  children: ReactNode;
}> = ({ icon, label, children }) => (
  <div className="flex items-center text-sm text-gray-600">
    <span className="mr-2 text-gray-400">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="ml-2">{children}</span>
  </div>
);

const BookingCard: FC<{ booking: Booking }> = ({ booking }) => {
  const { bikeDetails, startDate, endDate } = booking;
  const status = getBookingStatus(booking.status);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="relative h-48 w-full">
        <Image
          src={bikeDetails?.images?.[0] || "/placeholder-bike.jpg"}
          alt={`${bikeDetails.brand} ${bikeDetails.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div
          className={`absolute top-2 right-2 flex items-center gap-1.5 text-white text-xs font-semibold py-1 px-2 rounded-full ${status.color}`}
        >
          {status.icon} {status.text}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate">
          {bikeDetails.brand} {bikeDetails.model}
        </h3>
        <div className="space-y-3 mt-4">
          <InfoBlock icon={<Calendar size={16} />} label="From">
            {formatDate(startDate)}
          </InfoBlock>
          <InfoBlock icon={<Calendar size={16} />} label="To">
            {formatDate(endDate)}
          </InfoBlock>
          <InfoBlock icon={<Clock size={16} />} label="Duration">
            {duration} {duration > 1 ? "Days" : "Day"}
          </InfoBlock>
          <InfoBlock icon={<IndianRupee size={16} />} label="Total">
            <span className="font-bold text-gray-900">
              ₹{booking.totalPrice?.toFixed(2)}
            </span>
          </InfoBlock>
        </div>
      </div>
    </div>
  );
};

const BookingCardSkeleton: FC = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 w-full bg-gray-200"></div>
    <div className="p-5">
      <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
      <div className="space-y-3 mt-4">
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default function MyBookingsPage() {
  const user = useSelector(
    (state: ReduxState) => state.user.user as User | null
  );
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchBookings = async () => {
      const [active, completed] = await Promise.all([
        getActiveBookings(user?.id?.toString() || ""),
        getCompletedBookings(user?.id?.toString() || ""),
      ]);
      setActiveBookings(active.data);
      setCompletedBookings(completed.data);
    };

    fetchBookings();
  }, [user?.id]);

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <AlertTriangle className="mx-auto text-red-500 h-12 w-12" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Could not load bookings.
          </h3>
          <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
        </div>
      );
    }

    if (activeBookings?.length === 0 && completedBookings?.length === 0) {
      return (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <BikeIcon className="mx-auto text-blue-500 h-12 w-12" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No adventures booked yet.
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Your next great ride is just a click away.
          </p>
          <Link href="/bikes">
            <span className="mt-6 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Explore Bikes
            </span>
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        {activeBookings?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-green-500 pl-4">
              Active
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeBookings?.map((booking) => (
                <BookingCard key={Math.random()} booking={booking} />
              ))}
            </div>
          </section>
        )}
        {completedBookings?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-gray-500 pl-4">
              Past Bookings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedBookings.map((booking) => (
                <BookingCard key={Math.random()} booking={booking} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center py-16 px-6">
          <h3 className="text-lg font-medium text-gray-900">Welcome, Guest!</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please log in to see your adventures.
          </p>
          <Link href="/login">
            <span className="mt-6 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Log In
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          My Bookings
        </h1>
        <p className="text-lg text-gray-500 mb-10">
          Welcome back, {user?.name || "Rider"}! Here are your ride details.
        </p>
        {renderContent()}
      </div>
    </div>
  );
}
