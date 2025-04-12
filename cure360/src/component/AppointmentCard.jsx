import React from "react";
import { MapPinIcon, CalendarIcon } from "lucide-react";

export default function AppointmentCard({ appointment }) {
  return (
    <div className="p-4 bg-white border rounded-xl shadow space-y-2">
      <h3 className="text-lg font-semibold">{appointment.title}</h3>
      <div className="flex items-center text-sm text-gray-600">
        <CalendarIcon className="w-4 h-4 mr-2" />
        {appointment.date} at {appointment.time}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <MapPinIcon className="w-4 h-4 mr-2" />
        {appointment.location}
      </div>
    </div>
  );
}

