import React from "react";
export default function StatsCard({ icon, label, value }) {
    return (
      <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    );
  }
  