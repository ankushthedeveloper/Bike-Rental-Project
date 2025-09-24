import React from "react";

const UserTableSkeleton = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-slate-100">
        <tr>
          {Array.from({ length: 5 }).map((_, i) => (
            <th key={i} className="py-3 px-4 text-left"></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 7 }).map((_, index) => (
          <tr key={index} className="border-b">
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-4 w-24 bg-slate-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-32 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            </td>
            {Array.from({ length: 4 }).map((_, i) => (
              <td key={i} className="py-4 px-4">
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTableSkeleton;
