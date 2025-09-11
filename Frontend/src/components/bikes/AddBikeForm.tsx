"use client";

import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { BsBack } from "react-icons/bs";

type BikeForm = {
  brand: string;
  model: string;
  year: number;
  price: number;
  distanceTraveled: number;
  rentPerDay: number;
  noOfBikes: number;
  images: File[];
};

export default function AddBikeForm({
  setBikeModal,
}: {
  setBikeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form, setForm] = useState<Omit<BikeForm, "images">>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    distanceTraveled: 0,
    rentPerDay: 0,
    noOfBikes: 1,
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "year" ||
        name === "price" ||
        name === "distanceTraveled" ||
        name === "rentPerDay" ||
        name === "noOfBikes"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch("http://localhost:3001/bikes", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        setMessage("Bike added successfully!");
        setForm({
          brand: "",
          model: "",
          year: new Date().getFullYear(),
          price: 0,
          distanceTraveled: 0,
          rentPerDay: 0,
          noOfBikes: 1,
        });
        setImages([]);
      } else {
        const data = await res.json();
        setMessage(data.message || "Failed to add bike.");
      }
    } catch {
      setMessage("Failed to add bike. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form
      className="bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto mt-8 space-y-5 ml-100"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div
        onClick={() => setBikeModal(false)}
        className="cursor-pointer text-2xl text-gray-600 mb-4 bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-200 transition"
      >
        <BiArrowBack />
      </div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        Add New Bike
      </h2>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Brand</label>
        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Model</label>
        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Year</label>
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          min={1980}
          max={new Date().getFullYear()}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Distance Traveled (km)
        </label>
        <input
          type="number"
          name="distanceTraveled"
          value={form.distanceTraveled}
          onChange={handleChange}
          required
          min={0}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Rent Per Day
        </label>
        <input
          type="number"
          name="rentPerDay"
          value={form.rentPerDay}
          onChange={handleChange}
          required
          min={0}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Number of Bikes
        </label>
        <input
          type="number"
          name="noOfBikes"
          value={form.noOfBikes}
          onChange={handleChange}
          required
          min={1}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">Images</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <span key={idx} className="text-xs text-gray-500">
                {img.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add Bike"}
      </button>
      {message && (
        <div className="mt-4 text-center text-sm text-green-600">{message}</div>
      )}
    </form>
  );
}
