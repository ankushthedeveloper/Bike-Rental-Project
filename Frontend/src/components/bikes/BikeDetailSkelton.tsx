import React from "react";

export const BikeDetailSkeleton = () => {
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="w-full bg-slate-200 rounded-lg aspect-square"></div>
          <div className="flex gap-2 mt-4">
            <div className="w-20 h-20 bg-slate-200 rounded-md"></div>
            <div className="w-20 h-20 bg-slate-200 rounded-md"></div>
            <div className="w-20 h-20 bg-slate-200 rounded-md"></div>
            <div className="w-20 h-20 bg-slate-200 rounded-md"></div>
          </div>
        </div>
        <div className="pt-4">
          <div className="h-10 bg-slate-200 rounded-md w-3/4 mb-4"></div>
          <div className="h-6 bg-slate-200 rounded-md w-1/2 mb-8"></div>
          <div className="h-24 bg-slate-200 rounded-md w-full mb-8"></div>
          <div className="h-12 bg-slate-200 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};
