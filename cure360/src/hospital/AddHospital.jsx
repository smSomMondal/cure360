import { useState } from "react";

export default function AddHospitalForm() {
  // Department and facility enums (replace with your actual enums)
  const departmentEnum = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Gynecology",
    "Internal Medicine",
    "Emergency",
    "Radiology",
    "Oncology",
    "Psychiatry"
  ];

  const facilityEnum = [
    "ICU",
    "MRI",
    "CT Scan",
    "X-Ray",
    "Ambulance",
    "Blood Bank",
    "Pharmacy",
    "Laboratory",
    "Cafeteria",
    "Parking"
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    contactNumber: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      landmark: ""
    },
    departments: [],
    facilities: [],
    isActive: true,
    hospitalLicence: "",
    hospitalLicenceUrl: "",
    bedInfo: [{ bedType: "", count: 0, price: 0 }]
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle checkbox changes (for departments and facilities)
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [name]: [...prev[name], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: prev[name].filter(item => item !== value)
      }));
    }
  };

  // Handle bed info changes
  const handleBedInfoChange = (index, field, value) => {
    const updatedBedInfo = [...formData.bedInfo];
    updatedBedInfo[index][field] = value;
    
    setFormData(prev => ({
      ...prev,
      bedInfo: updatedBedInfo
    }));
  };

  // Add new bed info
  const addBedInfo = () => {
    setFormData(prev => ({
      ...prev,
      bedInfo: [...prev.bedInfo, { bedType: "", count: 0, price: 0 }]
    }));
  };

  // Remove bed info
  const removeBedInfo = (index) => {
    if (formData.bedInfo.length > 1) {
      const updatedBedInfo = [...formData.bedInfo];
      updatedBedInfo.splice(index, 1);
      
      setFormData(prev => ({
        ...prev,
        bedInfo: updatedBedInfo
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    if (!formData.name) newErrors.name = "Hospital name is required";
    if (!formData.registrationNumber) newErrors.registrationNumber = "Registration number is required";
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!formData.email) newErrors.email = "Email is required";
    
    // Address validation
    if (!formData.address.street) newErrors["address.street"] = "Street is required";
    if (!formData.address.city) newErrors["address.city"] = "City is required";
    if (!formData.address.state) newErrors["address.state"] = "State is required";
    if (!formData.address.country) newErrors["address.country"] = "Country is required";
    if (!formData.address.pincode) newErrors["address.pincode"] = "Pincode is required";
    if (!formData.address.landmark) newErrors["address.landmark"] = "Landmark is required";
    
    // Department validation
    if (formData.departments.length === 0) newErrors.departments = "At least one department is required";
    
    // License validation
    if (!formData.hospitalLicence) newErrors.hospitalLicence = "Hospital licence is required";
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors
    setErrors({});
    
    // Submit form data
    console.log("Form submitted:", formData);
    // Add your API call here to save the hospital data
    alert("Hospital added successfully!");
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Hospital</h1>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number*
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number*
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>
        
        {/* Address Information */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Address Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street*
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors["address.street"] && <p className="text-red-500 text-xs mt-1">{errors["address.street"]}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors["address.city"] && <p className="text-red-500 text-xs mt-1">{errors["address.city"]}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State*
              </label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors["address.state"] && <p className="text-red-500 text-xs mt-1">{errors["address.state"]}</p>}
            </div>
            
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country*
              </label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors["address.country"] && <p className="text-red-500 text-xs mt-1">{errors["address.country"]}</p>}
            </div>
             */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode*
              </label>
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors["address.pincode"] && <p className="text-red-500 text-xs mt-1">{errors["address.pincode"]}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark*
              </label>
              <input
                type="text"
                name="address.landmark"
                value={formData.address.landmark}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors["address.landmark"] && <p className="text-red-500 text-xs mt-1">{errors["address.landmark"]}</p>}
            </div>
          </div>
        </div>
        
        {/* Departments */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Departments</h2>
          {errors.departments && <p className="text-red-500 text-xs mb-2">{errors.departments}</p>}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {departmentEnum.map(dept => (
              <div key={dept} className="flex items-center">
                <input
                  type="checkbox"
                  id={`dept-${dept}`}
                  name="departments"
                  value={dept}
                  checked={formData.departments.includes(dept)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor={`dept-${dept}`} className="text-sm">
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Facilities */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {facilityEnum.map(facility => (
              <div key={facility} className="flex items-center">
                <input
                  type="checkbox"
                  id={`facility-${facility}`}
                  name="facilities"
                  value={facility}
                  checked={formData.facilities.includes(facility)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor={`facility-${facility}`} className="text-sm">
                  {facility}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bed Information */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Bed Information</h2>
          {formData.bedInfo.map((bed, index) => (
            <div key={index} className="mb-4 p-3 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-medium">Bed Type {index + 1}</h3>
                {formData.bedInfo.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBedInfo(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bed Type
                  </label>
                  <input
                    type="text"
                    value={bed.bedType}
                    onChange={(e) => handleBedInfoChange(index, 'bedType', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., General, ICU, Private"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Count
                  </label>
                  <input
                    type="number"
                    value={bed.count}
                    onChange={(e) => handleBedInfoChange(index, 'count', parseInt(e.target.value) || 0)}
                    className="w-full p-2 border rounded-md"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (per day)
                  </label>
                  <input
                    type="number"
                    value={bed.price}
                    onChange={(e) => handleBedInfoChange(index, 'price', parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addBedInfo}
            className="text-blue-500 text-sm mt-2 flex items-center"
          >
            + Add Another Bed Type
          </button>
        </div>
        
        {/* License Information */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">License Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital License Number*
              </label>
              <input
                type="text"
                name="hospitalLicence"
                value={formData.hospitalLicence}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.hospitalLicence && <p className="text-red-500 text-xs mt-1">{errors.hospitalLicence}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Document URL
              </label>
              <input
                type="text"
                name="hospitalLicenceUrl"
                value={formData.hospitalLicenceUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Upload and paste URL to license document"
              />
            </div>
          </div>
        </div>
        
        {/* Verification Status */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600">Initial verification status will be set to "pending"</p>
          </div>
        </div>
        
        {/* Status */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Status</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm">
              Hospital is currently active
            </label>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Hospital
          </button>
        </div>
      </div>
    </div>
  );
}