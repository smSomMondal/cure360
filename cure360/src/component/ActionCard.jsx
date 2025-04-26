import React from "react";
export default function ActionCard({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white border rounded-xl shadow hover:shadow-md hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="mb-2 p-2 rounded-full bg-blue-50 text-blue-600">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}