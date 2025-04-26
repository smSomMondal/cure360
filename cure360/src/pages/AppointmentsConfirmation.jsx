import React from "react";
import { CheckCircle, Calendar, Bell, ArrowLeft } from "lucide-react";

export default function AppointmentsConfirmation() {
  // In a real app, you would likely receive this data from props or context
  const appointmentDetails = {
    date: "April 25, 2025",
    time: "10:30 AM",
    doctor: "Dr. Sarah Johnson",
    location: "Main Medical Center, Floor 3",
    type: "General Checkup"
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      {/* Success Header */}
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h1 className="text-2xl font-bold text-gray-800">Your Appointment is Confirmed!</h1>
        <p className="mt-2 text-gray-600">
          We've successfully booked your appointment. A confirmation has been sent to your email.
        </p>
      </div>

      {/* Appointment Details Card */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
          <Calendar className="mr-2" size={20} />
          Appointment Details
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{appointmentDetails.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{appointmentDetails.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Doctor:</span>
            <span className="font-medium">{appointmentDetails.doctor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{appointmentDetails.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Appointment Type:</span>
            <span className="font-medium">{appointmentDetails.type}</span>
          </div>
        </div>
      </div>

      {/* Reminder Section */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100 flex items-start">
        <Bell className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={20} />
        <div>
          <h3 className="font-medium text-blue-800">Appointment Reminder</h3>
          <p className="text-blue-700 text-sm mt-1">
            We'll send you a reminder 24 hours before your appointment. Please arrive 15 minutes early to complete any paperwork.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <button 
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          onClick={() => window.location.href = '/dashboard'}
        >
          Return to Dashboard
        </button>
        
        <button 
          className="w-full bg-white text-blue-600 py-3 px-4 rounded-md border border-blue-600 hover:bg-blue-50 transition duration-200 font-medium flex justify-center items-center"
          onClick={() => window.location.href = '/appointments/reschedule'}
        >
          <Calendar className="mr-2" size={18} />
          Reschedule Appointment
        </button>
        
        <button 
          className="w-full bg-white text-gray-600 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200 flex justify-center items-center"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Home
        </button>
      </div>
    </div>
  );
}