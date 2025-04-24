import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function BookAppointment() {
  const location = useLocation();
  const doctor = location.state?.doctor;

  // Form state based on the schema
  const [appointment, setAppointment] = useState({
    patientId: "",
    ApplDate: new Date().toISOString().split('T')[0], // Today's date as default
    vesiteDate: "",
    nextDate: "",
    appDocId: doctor?._id || "",
    state: "active"
  });

  // List of patients - in a real app, you would fetch this from API
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate fetching patients
  useEffect(() => {
    // This simulates an API call to get patients
    setLoading(true);
    setTimeout(() => {
      setPatients([
        { _id: "p1", name: "John Doe", age: 35 },
        { _id: "p2", name: "Jane Smith", age: 42 },
        { _id: "p3", name: "Robert Johnson", age: 28 }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!appointment.patientId || !appointment.ApplDate || !appointment.appDocId) {
      alert("Please fill all required fields");
      return;
    }
    
    // Here you would typically send the data to your API
    console.log("Appointment data:", appointment);
    
    // Form is valid, continue to confirmation page
    // The Link component will handle navigation
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>

      {doctor ? (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p>
            {doctor.specialization} - {doctor.city}, {doctor.state}
          </p>
          <p>Experience: {doctor.experience} years</p>
        </div>
      ) : (
        <p className="text-red-500">No doctor selected</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Patient</label>
          {loading ? (
            <p>Loading patients...</p>
          ) : (
            <select
              name="patientId"
              value={appointment.patientId}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded"
              required
            >
              <option value="" disabled>Select patient</option>
              {patients.map(patient => (
                <option key={patient._id} value={patient._id}>
                  {patient.name} (Age: {patient.age})
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Appointment Date*</label>
          <input
            type="date"
            name="ApplDate"
            value={appointment.ApplDate}
            onChange={handleChange}
            className="w-full border border-black bg-white text-black p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Visit Date (Optional)</label>
          <input
            type="date"
            name="vesiteDate"
            value={appointment.vesiteDate}
            onChange={handleChange}
            className="w-full border border-black bg-white text-black p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Next Appointment Date (Optional)</label>
          <input
            type="date"
            name="nextDate"
            value={appointment.nextDate}
            onChange={handleChange}
            className="w-full border border-black bg-white text-black p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Appointment Status</label>
          <select
            name="state"
            value={appointment.state}
            onChange={handleChange}
            className="w-full border border-black bg-white text-black p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="accept">Accepted</option>
            <option value="cancel">Cancelled</option>
            <option value="close">Closed</option>
          </select>
        </div>

        <div className="pt-4">
          <Link 
            to="/appointments-confirmation"
            state={{ appointmentData: appointment }}
          >
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              Submit Appointment
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}