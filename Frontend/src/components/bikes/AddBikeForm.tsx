"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  X,
  Bike,
  Calendar,
  Hash,
  IndianRupee,
  Gauge,
  UploadCloud,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

type BikeFormState = {
  brand: string;
  model: string;
  year: number | "";
  price: number | "";
  distanceTraveled: number | "";
  rentPerDay: number | "";
  noOfBikes: number | "";
};

type Bike = BikeFormState & {
  _id: string;
  images: string[];
};

type AddBikeFormProps = {
  onClose: () => void;
  onSuccess: () => void;
  isEditing?: boolean;
  bikeToEdit?: any;
};

type InputFieldProps = {
  name: string;
  label: string;
  type: string;
  icon: React.ElementType;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // for other props like placeholder, min, max
};

const InputField = ({
  name,
  label,
  type,
  icon: Icon,
  value,
  onChange,
  ...props
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        <Icon size={18} />
      </span>
      <input
        id={name}
        name={name}
        type={type}
        value={value} // Use the value from props
        onChange={onChange} // Use the onChange from props
        required
        className="w-full border border-slate-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
        {...props}
      />
    </div>
  </div>
);

export default function AddBikeForm({
  onClose,
  onSuccess,
  isEditing = false,
  bikeToEdit,
}: AddBikeFormProps) {
  const [form, setForm] = useState<BikeFormState>({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    distanceTraveled: 0,
    rentPerDay: 0,
    noOfBikes: 1,
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<{
    loading: boolean;
    message: string;
    type: "idle" | "success" | "error";
  }>({ loading: false, message: "", type: "idle" });

  useEffect(() => {
    if (isEditing && bikeToEdit) {
      const { images, _id, ...bikeData } = bikeToEdit;
      setForm(bikeData);
      setExistingImages(images || []);
    }
  }, [isEditing, bikeToEdit]);

  useEffect(() => {
    const newImagePreviews = newImages.map((file) => URL.createObjectURL(file));
    setPreviews([...existingImages, ...newImagePreviews]);

    return () => newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [newImages, existingImages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const imageToRemove = previews[indexToRemove];
    const existingImagesCount = existingImages.length;

    if (indexToRemove < existingImagesCount) {
      setRemovedImages((prev) => [...prev, imageToRemove]);
      setExistingImages((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
    } else {
      const newImageIndex = indexToRemove - existingImagesCount;
      setNewImages((prev) =>
        prev.filter((_, index) => index !== newImageIndex)
      );
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", type: "idle" });

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    newImages.forEach((img) => formData.append("images", img));
    if (isEditing) {
      removedImages.forEach((imgUrl) =>
        formData.append("removedImages", imgUrl)
      );
    }
    const url = isEditing
      ? `http://localhost:3001/bikes/${bikeToEdit?.id}`
      : "http://localhost:3001/bikes";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        setStatus({
          loading: false,
          message: `Bike ${isEditing ? "updated" : "added"} successfully!`,
          type: "success",
        });
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        const data = await res.json();
        throw new Error(
          data.message || `Failed to ${isEditing ? "update" : "add"} bike.`
        );
      }
    } catch (err) {
      setStatus({
        loading: false,
        message:
          err instanceof Error ? err.message : "An unknown error occurred.",
        type: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            {isEditing ? "Edit Bike" : "Add New Bike"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <section>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">
              Bike Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                name="brand"
                label="Brand"
                type="text"
                icon={Bike}
                value={form.brand}
                onChange={handleChange}
              />
              <InputField
                name="model"
                label="Model"
                type="text"
                icon={Bike}
                placeholder="e.g., Classic 350"
                value={form.model}
                onChange={handleChange}
              />
              <InputField
                name="year"
                label="Year"
                type="number"
                icon={Calendar}
                min="1980"
                max={new Date().getFullYear()}
                value={form.year}
                onChange={handleChange}
              />
              <InputField
                name="distanceTraveled"
                label="Distance Traveled (km)"
                type="number"
                icon={Gauge}
                min="0"
                value={form.distanceTraveled}
                onChange={handleChange}
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">
              Pricing & Availability
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                name="price"
                label="Total Price (₹)"
                type="number"
                icon={IndianRupee}
                min="0"
                value={form.price}
                onChange={handleChange}
              />
              <InputField
                name="rentPerDay"
                label="Rent Per Day (₹)"
                type="number"
                icon={IndianRupee}
                min="0"
                value={form.rentPerDay}
                onChange={handleChange}
              />
              <InputField
                name="noOfBikes"
                label="Number of Bikes"
                type="number"
                icon={Hash}
                min="1"
                value={form.noOfBikes}
                onChange={handleChange}
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">
              Upload Photos
            </h3>
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud size={32} className="text-slate-400 mb-2" />
                <p className="mb-2 text-sm text-slate-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-slate-500">PNG, JPG, or WEBP</p>
              </div>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex-shrink-0">
          {/* Status Message */}
          <div className="flex-1">
            {status.message && (
              <div
                className={`flex items-center gap-2 text-sm ${
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status.type === "success" && <CheckCircle2 size={18} />}
                {status.type === "error" && <AlertTriangle size={18} />}
                <span>{status.message}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status.loading}
              className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
            >
              {status.loading && <Loader2 size={16} className="animate-spin" />}
              {status.loading
                ? isEditing
                  ? "Saving..."
                  : "Adding..."
                : isEditing
                ? "Save Changes"
                : "Add Bike"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
