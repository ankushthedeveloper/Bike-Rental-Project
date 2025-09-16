"use client";

import { Bike } from "@/types/bike";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Pencil, Trash2, Calendar, Gauge, IndianRupee } from "lucide-react";

type BikeComponentProps = {
  bike: Bike;
  isAdmin?: boolean;
  onDelete?: (bikeId: string) => void;
  onEdit?: (bike: Bike) => void;
};

const BikeComponent = ({
  bike,
  isAdmin,
  onDelete,
  onEdit,
}: BikeComponentProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/bikes/${bike.id}`);
  };
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Edit bike:", bike.id);
    onEdit?.(bike);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(bike.id.toString());
  };

  return (
    <div
      key={bike.id}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-48">
        <Image
          src={bike.images[0] || "/placeholder-bike.jpg"}
          alt={`${bike.brand} ${bike.model}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-slate-800 truncate">
          {bike.brand} {bike.model}
        </h2>
        <p className="text-sm text-slate-500 mb-4">{bike.model}</p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <IndianRupee size={16} className="text-blue-500" />
            <span className="font-semibold">
              {bike.rentPerDay.toLocaleString("en-IN")} / day
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={16} className="text-blue-500" />
            <span className="font-semibold">{bike.year}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Gauge size={16} className="text-blue-500" />
            <span className="font-semibold">
              {bike.distanceTraveled.toLocaleString("en-IN")} km
            </span>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
          <p className="text-slate-400 text-xs">
            Added on {new Date(bike.created_at).toLocaleDateString()}
          </p>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="p-2 rounded-full text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                aria-label="Edit bike"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                aria-label="Delete bike"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeComponent;
