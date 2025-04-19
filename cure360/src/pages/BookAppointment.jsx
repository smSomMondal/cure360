import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function BookAppointment() {
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [patientSymptoms, setPatientSymptoms] = useState("");
  const [patientGender, setPatientGender] = useState(""); // New state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: Console log or API call logic
    console.log({
      patientName,
      patientAge,
      patientContact,
      patientGender,
      patientSymptoms,
    });
  };

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
          <label className="block mb-1 font-medium">Patient Name</label>
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
          <label className="block mb-1 font-medium">Gender</label>
          <select
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            className=" border border-black bg-white text-black p-2 rounded"
            required
          >
            <option value="" disabled>Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
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
