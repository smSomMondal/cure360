import React, { useState } from "react";
import { Link } from "react-router-dom";
const doctorsDB = [
  {
    id: 1,
    name: "Dr. Naruto Uzumaki",
    state: "Tokyo",
    city: "Shibuya",
    specialization: "Cardiology",
    experience: 12,
  },
  {
    id: 2,
    name: "Dr. Hinata Hyuga",
    state: "Tokyo",
    city: "Shinjuku",
    specialization: "Dermatology",
    experience: 8,
  },
  {
    id: 3,
    name: "Dr. Sasuke Uchiha",
    state: "Osaka",
    city: "Namba",
    specialization: "Neurology",
    experience: 15,
  },
  {
    id: 4,
    name: "Dr. Sakura Haruno",
    state: "Tokyo",
    city: "Shibuya",
    specialization: "Cardiology",
    experience: 10,
  },
  {
    id: 5,
    name: "Dr. Tsunade",
    state: "Tokyo",
    city: "Shibuya",
    specialization: "Cardiology",
    experience: 15,
  },
  {
    id: 6,
    name: "Dr. Shizune",
    state: "Tokyo",
    city: "Shinjuku",
    specialization: "General Medicine",
    experience: 9,
  },
  {
    id: 7,
    name: "Dr. Kakashi",
    state: "Osaka",
    city: "Osaka",
    specialization: "Neurology",
    experience: 12,
  },
  {
    id: 8,
    name: "Dr. Sakura Haruno",
    state: "Kyoto",
    city: "Kyoto",
    specialization: "Pediatrics",
    experience: 8,
  },
  {
    id: 9,
    name: "Dr. Itachi Uchiha",
    state: "Osaka",
    city: "Namba",
    specialization: "Psychiatry",
    experience: 14,
  },
  {
    id: 10,
    name: "Dr. Ken Kaneki",
    state: "Hokkaido",
    city: "Sapporo",
    specialization: "Dermatology",
    experience: 6,
  },
  {
    id: 11,
    name: "Dr. Rukia Kuchiki",
    state: "Fukuoka",
    city: "Hakata",
    specialization: "Oncology",
    experience: 10,
  },
  {
    id: 12,
    name: "Dr. Levi Ackerman",
    state: "Tokyo",
    city: "Akihabara",
    specialization: "Orthopedics",
    experience: 13,
  },
  {
    id: 13,
    name: "Dr. Gojou Satoru",
    state: "Kyoto",
    city: "Gion",
    specialization: "Ophthalmology",
    experience: 11,
  },
  {
    id: 14,
    name: "Dr. Kento Nanami",
    state: "Osaka",
    city: "Umeda",
    specialization: "Gastroenterology",
    experience: 7,
  },
];

const specializations = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Gynecology",
  "Oncology",
  "Dermatology",
  "Psychiatry",
  "Radiology",
  "General Medicine",
  "ENT",
  "Urology",
  "Gastroenterology",
  "Nephrology",
];


const states = {
    Tokyo: ["Shibuya", "Shinjuku", "Akihabara"],
    Osaka: ["Osaka", "Namba", "Umeda"],
    Kyoto: ["Kyoto", "Gion"],
    Hokkaido: ["Sapporo"],
    Fukuoka: ["Hakata"],
  };
//will change it to json file later

export default function BookDoctor() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("");

  const filteredDoctors = doctorsDB
    .filter(
      (doc) =>
        (!selectedState || doc.state === selectedState) &&
        (!selectedCity || doc.city === selectedCity) &&
        (!selectedSpec || doc.specialization === selectedSpec)
    )
    .sort((a, b) => b.experience - a.experience);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Book a Doctor</h1>

      {/* Dropdowns */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">State</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
          >
            <option value="">Select State</option>
            {Object.keys(states).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">City</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {selectedState &&
              states[selectedState].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Specialization</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Results */}
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-xl p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{doc.name}</h2>
                <p className="text-sm text-gray-600">
                  {doc.specialization} • {doc.city}, {doc.state}
                </p>
                <p className="text-sm">Experience: {doc.experience} years</p>
              </div>
              <Link to="/book-appointment" state={{ doctor: doc }}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                  Book
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No doctors found with selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
