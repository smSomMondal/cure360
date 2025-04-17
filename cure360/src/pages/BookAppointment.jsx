import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function BookAppointment() {
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [patientSymptoms, setPatientSymptoms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>

      {doctor ? (
        <div>
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p>
            {doctor.specialization} - {doctor.city}, {doctor.state}
          </p>
          <p>Experience: {doctor.experience} years</p>
        </div>
      ) : (
        <p>No doctor selected</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Patient name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full border border-black bg-white text-black p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="w-full border border-black bg-white text-black p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="tel"
            value={patientContact}
            onChange={(e) => setPatientContact(e.target.value)}
            className="w-full border border-black bg-white text-black p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Symptoms</label>
          <textarea
            value={patientSymptoms}
            onChange={(e) => setPatientSymptoms(e.target.value)}
            className="w-full border border-black bg-white text-black p-2 rounded"
            required
          />
        </div>
        <Link to="/appointments-confirmation">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Submit Appointment
          </button>
        </Link>
      </form>
    </div>
  );
}
