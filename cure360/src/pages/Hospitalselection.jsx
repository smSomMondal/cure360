import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

// Mock data - replace with actual API call in production
const hospitalData = {
  "Maharashtra": {
    "Mumbai": [
      { id: 1, name: "Apollo Hospital", beds: 45, rating: 4.5, specializations: ["Cardiology", "Neurology", "Oncology"] },
      { id: 2, name: "Lilavati Hospital", beds: 30, rating: 4.2, specializations: ["Orthopedics", "Pediatrics"] },
      { id: 3, name: "Fortis Hospital", beds: 38, rating: 4.3, specializations: ["General Surgery", "Internal Medicine"] }
    ],
    "Pune": [
      { id: 4, name: "Ruby Hall Clinic", beds: 25, rating: 4.0, specializations: ["Cardiology", "Gynecology"] },
      { id: 5, name: "Sahyadri Hospital", beds: 42, rating: 4.4, specializations: ["Neurology", "Urology"] }
    ]
  },
  "Karnataka": {
    "Bangalore": [
      { id: 6, name: "Manipal Hospital", beds: 50, rating: 4.7, specializations: ["Oncology", "Cardiology"] },
      { id: 7, name: "Columbia Asia", beds: 35, rating: 4.1, specializations: ["Orthopedics", "ENT"] }
    ],
    "Mysore": [
      { id: 8, name: "JSS Hospital", beds: 28, rating: 3.9, specializations: ["General Medicine", "Pediatrics"] }
    ]
  },
  "Delhi": {
    "New Delhi": [
      { id: 9, name: "AIIMS", beds: 60, rating: 4.8, specializations: ["Cardiology", "Neurology", "Oncology", "Pediatrics"] },
      { id: 10, name: "Max Healthcare", beds: 40, rating: 4.3, specializations: ["Orthopedics", "Gynecology"] }
    ]
  }
};

// Get all states from the data
const states = Object.keys(hospitalData);

export default function HospitalSelection() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      setCities(Object.keys(hospitalData[selectedState]));
      setSelectedCity("");
      setHospitals([]);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  // Update hospitals when city changes
  useEffect(() => {
    if (selectedState && selectedCity) {
      setHospitals(hospitalData[selectedState][selectedCity]);
    } else {
      setHospitals([]);
    }
  }, [selectedCity, selectedState]);

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleHospitalClick = (hospitalId) => {
    // In a real application, navigate to the hospital dashboard
    console.log(`Navigate to hospital dashboard for ID: ${hospitalId}`);
    // Example: history.push(`/hospital/${hospitalId}`);
    alert(`Navigating to hospital dashboard for ${hospitalId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Find Available Hospital Beds</h1>
        
        {/* Location Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Hospital List */}
        {selectedCity && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Hospitals in {selectedCity}, {selectedState}
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search hospitals..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            {filteredHospitals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredHospitals.map(hospital => (
                  <div 
                    key={hospital.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
                    onClick={() => handleHospitalClick(hospital.id)}
                  >
                    <h3 className="text-lg font-semibold text-blue-700">{hospital.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                        Available Beds: {hospital.beds}
                      </div>
                      <div className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center">
                        <span className="text-yellow-500 mr-1">★</span> {hospital.rating}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 font-medium">Specializations:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {hospital.specializations.map((spec, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No hospitals found. Please try another search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}