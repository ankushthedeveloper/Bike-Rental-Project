"use client";
import { Bike } from "@/types/bike";
import { useRouter } from "next/navigation";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const BikeComponent = ({
  bike,
  isAdmin,
}: {
  bike: Bike;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  return (
    <div
      key={bike.id}
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
      onClick={() => {
        router.push(`/bikes/${bike.id}`);
      }}
    >
      <div className="flex justify-between items-start">
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
        {isAdmin && (
          <div className=" flex gap-5">
            <button className="bg-red-500 text-white py-1 px-3 rounded pointer">
              <MdDelete />
            </button>
            <button className="bg-blue-500 text-white py-1 px-3 rounded pointer">
              <BiEdit />
            </button>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold text-blue-500 mb-2">
        {bike.brand} {bike.model}
      </h2>
      <p className="text-gray-700 mb-1">Year: {bike.year}</p>
      <p className="text-gray-700 mb-1">Price: ₹{bike.price}</p>
      <p className="text-gray-700 mb-1">Distance: {bike.distanceTraveled} km</p>
      <p className="text-gray-400 text-xs mt-2">
        Added on {new Date(bike.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BikeComponent;
