import { FC } from "react";

export const BookingCardSkeleton: FC = () => (
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
