import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatedBedInfo = () => {
  const [bedInfo, setBedInfo] = useState([]);
  const [hospitalId, setHospitalId] = useState();
  const [selectedBed, setSelectedBed] = useState(null);
  const [newAadhar, setNewAadhar] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBed = async () => {
    try {
      setLoading(true);
      console.log("Fetching bed information...");

      const storedData = JSON.parse(localStorage.getItem('user'));
      const token = storedData?.token;
      
      const res = await axios.post("http://127.0.0.1:5000/hospital/hosData", {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      
      console.log(res.data.data.bedInfo);
      if (res.status === 200) {
        setHospitalId(res.data.data._id);
        setBedInfo(res.data.data.bedInfo);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch bed information");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBed();
  }, []);

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const updateBed = async () => {
    try {
      const payload = {
        bedType: selectedBed.bedType,
        maxCapacity: selectedBed.maxCapacity,
      };
      await axios.post(`http://127.0.0.1:5000/hospital/${hospitalId}/bedinfo`, payload);
      showSuccessMessage("Bed capacity updated successfully!");
      fetchBed();
    } catch (error) {
      setError("Failed to update bed information");
      console.error(error);
    }
  };

  const addAadhar = async () => {
    try {
      if (!newAadhar || newAadhar.length !== 12 || isNaN(Number(newAadhar))) {
        setError("Please enter a valid 12-digit Aadhar number");
        return;
      }

      const data = await axios.post(`http://127.0.0.1:5000/hospital/${hospitalId}/bedinfo`, {
        bedType: selectedBed.bedType,
        addAadhar: [newAadhar]
      });
      showSuccessMessage("Aadhar number added successfully!");
      setNewAadhar('');
      console.log(data);
      
      if(data.status===200){
        window.location.reload();
      }else{
        console.log(data.data);
        
      }
        
      // updateBed();
      fetchBed();
    } catch (error) {
      console.log(error.response.data.massage);
      
      setError(error.response.data.massage);
      console.error(error);
    }
  };

  const removeAadhar = async (aadhar) => {
    try {
      await axios.post(`http://127.0.0.1:5000/hospital/${hospitalId}/bedinfo`, {
        bedType: selectedBed.bedType,
        removeAadhar: [aadhar]
      });
      showSuccessMessage("Aadhar number removed successfully!");
      window.location.reload();
      fetchBed();
    } catch (error) {
      setError("Failed to remove Aadhar number");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Hospital Bed Management</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded relative">
              {successMessage}
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative">
              {error}
              <button 
                className="absolute top-0 right-0 px-4 py-3" 
                onClick={() => setError(null)}
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          )}

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedType">
                Select Bed Type
              </label>
              <select 
                id="bedType"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setSelectedBed(bedInfo.find(b => b.bedType === e.target.value))}
                value={selectedBed?.bedType || ""}
              >
                <option value="">Select Bed Type</option>
                {bedInfo.length > 0 ? (
                  bedInfo.map(bed => <option key={bed._id} value={bed.bedType}>{bed.bedType}</option>)
                ) : (
                  <option disabled>No bed types found</option>
                )}
              </select>
            </div>

            {selectedBed && (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">{selectedBed.bedType} Configuration</h3>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="maxCapacity">
                    Maximum Capacity
                  </label>
                  <div className="flex items-center">
                    <input
                      id="maxCapacity"
                      type="number"
                      className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                      value={selectedBed.maxCapacity}
                      onChange={(e) => setSelectedBed({ ...selectedBed, maxCapacity: parseInt(e.target.value) })}
                    />
                    <button 
                      onClick={updateBed}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Update Capacity
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Assigned Aadhar Numbers</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    {selectedBed.addharNo && selectedBed.addharNo.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {selectedBed.addharNo.map(aadhar => (
                          <li key={aadhar} className="py-3 flex justify-between items-center">
                            <span className="text-gray-700 font-medium">{aadhar}</span>
                            <button 
                              onClick={() => removeAadhar(aadhar)}
                              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded focus:outline-none focus:shadow-outline"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No Aadhar numbers assigned to this bed type</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newAadhar">
                      Add New Aadhar Number
                    </label>
                    <div className="flex">
                      <input
                        id="newAadhar"
                        type="text"
                        placeholder="Enter 12-digit Aadhar number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        value={newAadhar}
                        onChange={e => setNewAadhar(e.target.value)}
                        maxLength={12}
                      />
                      <button 
                        onClick={addAadhar}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!selectedBed && bedInfo.length > 0 && (
              <div className="mt-4 text-center text-gray-600">
                Please select a bed type to manage its details
              </div>
            )}
            
            {bedInfo.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-600">No bed information available</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UpdatedBedInfo;