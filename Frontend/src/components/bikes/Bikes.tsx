"use client";
import { Bike } from "@/types/bike";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BikeComponent from "./BikeComponent";
import AddBikeForm from "./AddBikeForm";
import { useDispatch } from "react-redux";
import { clearUser } from "@/lib/states/auth.slice";
import { getAllBikes } from "@/services/bikes";

const Bikes = ({ isAdmin }: { isAdmin?: boolean }) => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [addBikeModalOpen, setAddBikeModalOpen] = useState(false);
  const [editBike, setEditBike] = useState<boolean>(false);
  const [bikeToEdit, setBikeToEdit] = useState<Bike | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  let fetchBikes: () => Promise<void>;
  const handleClose = () => {
    setEditBike(false);
    setBikeToEdit(null);
  };
  const handleSuccess = () => {
    fetchBikes();
    handleClose();
  };
  useEffect(() => {
    fetchBikes = async () => {
      const response = await getAllBikes();
      if (response.statusCode === 200) {
        setBikes(response.data || []);
      } else if (response.statusCode === 401) {
        dispatch(clearUser());
        router.push("/login");
      } else {
        console.error("Error fetching bikes:", response);
      }
      setLoading(false);
    };
    fetchBikes();
  }, []);
  return addBikeModalOpen || editBike ? (
    editBike ? (
      <AddBikeForm
        onClose={handleClose}
        onSuccess={handleSuccess}
        isEditing={true}
        bikeToEdit={bikeToEdit!}
      />
    ) : (
      <AddBikeForm
        onClose={() => setAddBikeModalOpen(false)}
        onSuccess={handleSuccess}
      />
    )
  ) : (
    <div className="min-h-screen bg-gray-50 p-8">
      {isAdmin ? (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 text-center ml-[40%]">
            All Bikes
          </h1>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded text-black"
            onClick={() => setAddBikeModalOpen(true)}
          >
            Add New Bike
          </button>
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center ">
          Available Bikes
        </h1>
      )}
      {loading ? (
        <div className="text-center text-gray-500">Loading bikes...</div>
      ) : bikes?.length === 0 ? (
        <div className="text-center text-gray-500">No bikes available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikes?.map((bike) => (
            <BikeComponent
              key={bike.id}
              bike={bike}
              isAdmin={isAdmin}
              onEdit={(bike) => {
                setEditBike(true);
                setBikeToEdit(bike);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bikes;
