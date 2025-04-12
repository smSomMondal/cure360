import React from "react";

export default function ActionCard({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-white border rounded-xl shadow hover:bg-gray-100 transition"
    >
      <div className="mb-2 text-primary">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
}
