import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    gender: "male", // default
    height: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Patient Data:", formData);
    // Optionally send to backend using fetch/axios here
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-black bg-white text-black p-2 rounded"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border border-black bg-white text-black p-2 rounded"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full border border-black bg-white text-black p-2 rounded"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block mb-1 font-medium">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            className="w-full border border-black bg-white text-black p-2 rounded"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full border border-black bg-white text-black p-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Address Fields */}
        <div>
          <h3 className="text-lg font-semibold mt-4">Address</h3>

          <div className="mt-2">
            <label className="block mb-1">Street</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded"
            />
          </div>

          <div className="mt-2">
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded"
            />
          </div>

          <div className="mt-2">
            <label className="block mb-1">State</label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded"
            />
          </div>

          <div className="mt-2">
            <label className="block mb-1">Country</label>
            <input
              type="text"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded"
            />
          </div>

          <div className="mt-2">
            <label className="block mb-1">Pincode</label>
            <input
              type="text"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Link to="/dashboard">
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Register Patient
          </button>
        </Link>
      </form>
    </div>
  );
}
