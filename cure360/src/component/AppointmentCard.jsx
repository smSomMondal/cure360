import React from "react";
import { CalendarIcon, MapPinIcon } from "lucide-react";
export default function AppointmentCard({ appointment }) {
  const getBadgeColor = (type) => {
    switch(type.toLowerCase()) {
      case "doctor": return "bg-green-100 text-green-800";
      case "lab": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const startCall=()=>{
    window.location.href='https://whimsical-melomakarona-512245.netlify.app/'
  }

  return (
    <div className="p-4 bg-white border rounded-xl shadow hover:shadow-md transition-shadow space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{appointment.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(appointment.type)}`}>
          {appointment.type}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
        {appointment.date} at {appointment.time}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
        {appointment.location}
      </div>
      <div className="flex justify-between pt-2 mt-2 border-t border-gray-100">
        <button  onClick={startCall} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          start call
        </button>
        <button className="text-xs text-red-600 hover:text-red-800 font-medium">
          Cancel
        </button>
      </div>
    </div>
  );
}


