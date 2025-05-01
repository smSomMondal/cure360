import { useState } from 'react';
import axios from 'axios'

export default function PatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    gender: 'male',
    height: '',
    bloodGroup: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age <= 0) newErrors.age = "Age must be a positive number";

    if (!formData.weight) newErrors.weight = "Weight is required";
    else if (isNaN(formData.weight) || formData.weight <= 0) newErrors.weight = "Weight must be a positive number";

    if (!formData.height) newErrors.height = "Height is required";
    else if (isNaN(formData.height) || formData.height <= 0) newErrors.height = "Height must be a positive number";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newErrors = validate();

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Here you would normally submit the data to your backend
      console.log("Form data:", formData);
      const storedData = JSON.parse(localStorage.getItem('user'));
      const token = storedData?.token;
      const Res = await axios.post("http://127.0.0.1:5000/patient/add", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      console.log(Res);
      
      // Navigate to dashboard after successful validation
      if (Res.status === 200) {
        window.location.href = '/dashboard';
      }
      
    } catch (error) {
      console.log(error);

    }

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Patient Registration Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-50 p-5 rounded-md">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Full Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Age (years)*
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Age"
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Gender*
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Weight (kg)*
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Weight"
              />
              {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Height (cm)*
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Height"
              />
              {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="OTHERS">OTHERS</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>
        </div>
        {/*emergency contact */}
        <div className="bg-gray-50 p-5 rounded-md">
          <h3 className="text-lg font-medium mb-4">Emmergency Information</h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="emergencyContact.name"
              value={formData.emergencyContact.name}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone no
              </label>
              <input
                type="text"
                name="emergencyContact.phone"
                value={formData.emergencyContact.phone}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Relation
              </label>
              <input
                type="text"
                name="emergencyContact.relation"
                value={formData.emergencyContact.relation}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="State"
              />
            </div>
          </div>


        </div>
        {/* Address Section */}
        <div className="bg-gray-50 p-5 rounded-md">
          <h3 className="text-lg font-medium mb-4">Address Information</h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                City
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                State/Province
              </label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="State"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Country"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm bg-white font-medium mb-2">
                Postal/ZIP Code
              </label>
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="w-full border border-black bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Postal code"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Register Patient & Go to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}