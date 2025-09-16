"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Bike,
  BookCopy,
  AlertTriangle,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "react-toastify";

// --- Type Definitions (assuming these are in a central file) ---
type User = { id: number; name: string; email: string; created_at: string };
type Bike = { id: number; brand: string; model: string; images: string[] };
type Booking = {
  id: number;
  bikeId: number;
  userId: number;
  startDate: string;
  totalPrice: number;
};

// --- Child Components for the Dashboard ---

// A single Key Performance Indicator (KPI) card
const StatCard = ({ title, value, growth, icon: Icon, color }: any) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
    <div className="flex justify-between items-center">
      <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      {growth > 0 && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <ArrowUpRight size={14} /> +{growth} in last 7 days
        </p>
      )}
    </div>
  </div>
);

// A skeleton loader that mimics the dashboard layout
const DashboardSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="h-32 bg-slate-200 rounded-xl"></div>
      <div className="h-32 bg-slate-200 rounded-xl"></div>
      <div className="h-32 bg-slate-200 rounded-xl"></div>
      <div className="h-32 bg-slate-200 rounded-xl"></div>
    </div>
    <div className="h-80 bg-slate-200 rounded-xl mb-8"></div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="h-96 bg-slate-200 rounded-xl"></div>
      <div className="h-96 bg-slate-200 rounded-xl"></div>
    </div>
  </div>
);

// --- Main Dashboard Component ---

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, bikesRes, bookingsRes] = await Promise.all([
          fetch(`${baseURL}/users`, { credentials: "include" }),
          fetch(`${baseURL}/bikes`, { credentials: "include" }),
          fetch(`${baseURL}/booking`, { credentials: "include" }),
        ]);

        if (!usersRes.ok || !bikesRes.ok || !bookingsRes.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const usersData = await usersRes.json();
        const bikesData = await bikesRes.json();
        const bookingsData = await bookingsRes.json();

        // Basic validation
        setUsers(Array.isArray(usersData.data) ? usersData.data : []);
        setBikes(Array.isArray(bikesData.data) ? bikesData.data : []);
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
        toast.error("Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [baseURL]);

  // --- Memoized Data Processing for Charts & Stats ---

  const processedData = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    // KPI stats
    const newUsersLast7Days = users.filter(
      (u) => new Date(u.created_at) >= weekAgo
    ).length;
    const newBookingsLast7Days = bookings.filter(
      (b) => new Date(b.startDate) >= weekAgo
    ).length;
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

    // Bookings over time (last 30 days)
    const bookingsByDate: { [key: string]: number } = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      bookingsByDate[d.toISOString().split("T")[0]] = 0;
    }
    bookings.forEach((b) => {
      const date = new Date(b.startDate).toISOString().split("T")[0];
      if (bookingsByDate[date] !== undefined) {
        bookingsByDate[date]++;
      }
    });
    const bookingChartData = Object.entries(bookingsByDate).map(
      ([date, count]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        Bookings: count,
      })
    );

    // Popular bikes
    const bikePopularity: { [key: string]: number } = {};
    bookings.forEach((b) => {
      const bike = bikes.find((bike) => bike.id === b.bikeId);
      if (bike) {
        const name = `${bike.brand} ${bike.model}`;
        bikePopularity[name] = (bikePopularity[name] || 0) + 1;
      }
    });
    const popularBikesChartData = Object.entries(bikePopularity)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, Bookings: count }));

    return {
      newUsersLast7Days,
      newBookingsLast7Days,
      totalRevenue,
      bookingChartData,
      popularBikesChartData,
      recentUsers: users.slice(-5).reverse(),
      recentBookings: bookings.slice(-5).reverse(),
    };
  }, [users, bikes, bookings]);

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="p-8">
        <DashboardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">
          Oops! Something went wrong.
        </h2>
        <p className="text-slate-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6  min-h-screen bg-slate-50">
      <header className="">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500">
          Welcome back! Here's what's happening today,{" "}
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          .
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`₹${processedData.totalRevenue.toLocaleString("en-IN")}`}
          growth={0}
          icon={IndianRupee}
          color="text-green-500"
        />
        <StatCard
          title="Total Bookings"
          value={bookings.length}
          growth={processedData.newBookingsLast7Days}
          icon={BookCopy}
          color="text-yellow-500"
        />
        <StatCard
          title="Total Users"
          value={users.length}
          growth={processedData.newUsersLast7Days}
          icon={Users}
          color="text-blue-500"
        />
        <StatCard
          title="Bikes Listed"
          value={bikes.length}
          growth={0}
          icon={Bike}
          color="text-purple-500"
        />
      </div>

      {/* --- Bookings Chart --- */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Bookings (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={processedData.bookingChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Bookings"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* --- Recent Activity & Popular Bikes --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Popular Bikes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={processedData.popularBikesChartData}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="Bookings" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Recent Bookings
          </h3>
          <ul className="space-y-4">
            {processedData.recentBookings.map((booking) => {
              const user = users.find((u) => u.id === booking.userId);
              const bike = bikes.find((b) => b.id === booking.bikeId);
              return (
                <li key={booking.id} className="flex items-center gap-4">
                  <img
                    src={bike?.images[0] || "/placeholder-bike.jpg"}
                    alt={bike?.model}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-800">
                      {bike
                        ? `${bike.brand} ${bike.model}`
                        : `Bike #${booking.bikeId}`}
                    </p>
                    <p className="text-xs text-slate-500">
                      Booked by {user ? user.name : `User #${booking.userId}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-slate-800">
                      ₹{booking.totalPrice}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
