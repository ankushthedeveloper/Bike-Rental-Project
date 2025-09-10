"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

export default function BikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/bikes", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setBikes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Available Bikes
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading bikes...</div>
      ) : bikes.length === 0 ? (
        <div className="text-center text-gray-500">No bikes available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
              onClick={() => {
                router.push(`/bikes/${bike.id}`);
              }}
            >
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {bike.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${bike.brand} ${bike.model}`}
                    className="h-32 w-32 object-cover rounded border"
                  />
                ))}
              </div>
              <h2 className="text-xl font-semibold text-blue-500 mb-2">
                {bike.brand} {bike.model}
              </h2>
              <p className="text-gray-700 mb-1">Year: {bike.year}</p>
              <p className="text-gray-700 mb-1">Price: ₹{bike.price}</p>
              <p className="text-gray-700 mb-1">
                Distance: {bike.distanceTraveled} km
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Added on {new Date(bike.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
