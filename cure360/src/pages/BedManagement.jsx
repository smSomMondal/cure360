import React, { useState } from 'react';
import {
  Hospital,
  UserPlus,
  X,
  Home
} from 'lucide-react';

const BedManagement = () => {
  const [beds, setBeds] = useState({
    total: 100,
    occupied: 75,
    available: 25,
    icu: { 
      total: 20, 
      occupied: 15, 
      beds: Array(20).fill(null).map((_, i) => ({
        id: `ICU-${i + 1}`,
        status: i < 15 ? 'occupied' : 'available',
        patient: i < 15 ? { 
          name: `Patient ${i + 1}`,
          aadhaar: "123456789012", 
          admissionDate: '2025-04-25', 
          expectedDischarge: '2025-04-30' 
        } : null
      }))
    },
    general: { 
      total: 60, 
      occupied: 45, 
      beds: Array(60).fill(null).map((_, i) => ({
        id: `GEN-${i + 1}`,
        status: i < 45 ? 'occupied' : 'available',
        patient: i < 45 ? { 
          name: `Patient ${i + 1}`,
          aadhaar: "123456789012", 
          admissionDate: '2025-04-25', 
          expectedDischarge: '2025-04-29' 
        } : null
      }))
    },
    emergency: { 
      total: 20, 
      occupied: 15, 
      beds: Array(20).fill(null).map((_, i) => ({
        id: `EMG-${i + 1}`,
        status: i < 15 ? 'occupied' : 'available',
        patient: i < 15 ? { 
          name: `Patient ${i + 1}`,
          aadhaar: "123456789012", 
          admissionDate: '2025-04-26', 
          expectedDischarge: '2025-04-28' 
        } : null
      }))
    }
  });

  const [open, setOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [activeTab, setActiveTab] = useState('icu');
  const [formErrors, setFormErrors] = useState({});
  const [newPatient, setNewPatient] = useState({
    name: "",
    aadhaar: "",
    admissionDate: new Date().toISOString().split("T")[0],
    expectedDischarge: "",
    department: "",
  });

  const validateForm = () => {
    const errors = {};
    if (!newPatient.name.trim()) {
      errors.name = "Patient name is required";
    }
    
    if (!newPatient.aadhaar.trim()) {
      errors.aadhaar = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(newPatient.aadhaar)) {
      errors.aadhaar = "Aadhaar must be exactly 12 digits";
    }
    
    if (!newPatient.admissionDate) {
      errors.admissionDate = "Admission date is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAssignBed = () => {
    if (!validateForm()) {
      return;
    }

    const department = newPatient.department.toLowerCase();
    const updatedBeds = { ...beds };
    const bedToUpdate = updatedBeds[department].beds.find(
      (bed) => bed.id === selectedBed
    );

    if (bedToUpdate) {
      bedToUpdate.status = "occupied";
      bedToUpdate.patient = {
        name: newPatient.name,
        aadhaar: newPatient.aadhaar,
        admissionDate: newPatient.admissionDate,
        expectedDischarge: newPatient.expectedDischarge,
      };
      updatedBeds[department].occupied += 1;
      updatedBeds.occupied += 1;
      updatedBeds.available -= 1;
      setBeds(updatedBeds);
    }

    setOpen(false);
    setNewPatient({
      name: "",
      aadhaar: "",
      admissionDate: new Date().toISOString().split("T")[0],
      expectedDischarge: "",
      department: "",
    });
    setFormErrors({});
    setSelectedBed(null);
  };

  const handleDischargeBed = (department, bedId) => {
    const updatedBeds = { ...beds };
    const bedToUpdate = updatedBeds[department].beds.find(
      (bed) => bed.id === bedId
    );

    if (bedToUpdate) {
      bedToUpdate.status = "available";
      bedToUpdate.patient = null;
      updatedBeds[department].occupied -= 1;
      updatedBeds.occupied -= 1;
      updatedBeds.available += 1;
      setBeds(updatedBeds);
    }
  };

  const handleNavigateHome = () => {
    window.location.href = '/home';
    // In a real app, you would use router navigation here
    // For example: router.push('/') or history.push('/') or window.location.href = '/'
  };

  const StatCard = ({ title, total, available, occupied, icon }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-medium ml-2">{title}</h3>
      </div>
      <p className="text-3xl font-bold mb-4">{total}</p>
      <div className="flex gap-2">
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Available: {available}
        </span>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Occupied: {occupied}
        </span>
      </div>
    </div>
  );

  const TabButton = ({ name, active, onClick }) => (
    <button
      className={`px-4 py-2 font-medium text-sm ${
        active 
          ? 'bg-blue-600 text-white rounded-t-lg' 
          : 'text-blue-600 hover:bg-blue-50'
      }`}
      onClick={onClick}
    >
      {name.toUpperCase()}
    </button>
  );

  const StatusBadge = ({ status }) => (
    <span 
      className={`px-2 py-0.5 text-xs font-medium rounded ${
        status === 'available' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}
    >
      {status}
    </span>
  );

  const FormInput = ({ label, type, value, onChange, error, placeholder }) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <button 
            className="mr-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={handleNavigateHome}
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </button>
          <h1 className="text-2xl font-bold">Bed Management</h1>
        </div>
        <button
          className={`flex items-center px-4 py-2 text-white font-medium rounded ${
            selectedBed 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={() => selectedBed && setOpen(true)}
          disabled={!selectedBed}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Assign Bed
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Beds" 
          total={beds.total} 
          available={beds.available} 
          occupied={beds.occupied}
          icon={<Hospital className="w-5 h-5 text-blue-600" />} 
        />
        {['icu', 'general', 'emergency'].map((dept) => (
          <StatCard 
            key={dept}
            title={`${dept.toUpperCase()} Beds`} 
            total={beds[dept].total} 
            available={beds[dept].total - beds[dept].occupied} 
            occupied={beds[dept].occupied}
            icon={<Hospital className="w-5 h-5 text-blue-600" />} 
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b">
          {['icu', 'general', 'emergency'].map((dept) => (
            <TabButton 
              key={dept}
              name={dept} 
              active={activeTab === dept}
              onClick={() => setActiveTab(dept)} 
            />
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Bed ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Patient Name</th>
                <th className="px-6 py-3">Aadhaar</th>
                <th className="px-6 py-3">Admission Date</th>
                <th className="px-6 py-3">Expected Discharge</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {beds[activeTab].beds.map((bed) => (
                <tr key={bed.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{bed.id}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={bed.status} />
                  </td>
                  <td className="px-6 py-4">{bed.patient?.name || '-'}</td>
                  <td className="px-6 py-4">{bed.patient?.aadhaar || '-'}</td>
                  <td className="px-6 py-4">{bed.patient?.admissionDate || '-'}</td>
                  <td className="px-6 py-4">{bed.patient?.expectedDischarge || '-'}</td>
                  <td className="px-6 py-4">
                    {bed.status === 'available' ? (
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-2"
                        title="Select for assignment"
                        onClick={() => {
                          setSelectedBed(bed.id);
                          setNewPatient({...newPatient, department: activeTab});
                          setOpen(true);
                        }}
                      >
                        <UserPlus className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        className="text-red-600 hover:text-red-900 mr-2"
                        title="Discharge patient"
                        onClick={() => handleDischargeBed(activeTab, bed.id)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Assign Bed: {selectedBed}</h2>
            
            <FormInput 
              label="Patient Name *"
              type="text"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              error={formErrors.name}
              placeholder="Enter patient name"
            />
            
            <FormInput 
              label="Aadhaar Number *"
              type="text"
              value={newPatient.aadhaar}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow digits and limit to 12
                if (value === '' || (/^\d*$/.test(value) && value.length <= 12)) {
                  setNewPatient({ ...newPatient, aadhaar: value });
                }
              }}
              error={formErrors.aadhaar}
              placeholder="Enter 12-digit Aadhaar number"
            />
            
            <FormInput 
              label="Admission Date *"
              type="date"
              value={newPatient.admissionDate}
              onChange={(e) => setNewPatient({ ...newPatient, admissionDate: e.target.value })}
              error={formErrors.admissionDate}
            />
            
            <FormInput 
              label="Expected Discharge Date"
              type="date"
              value={newPatient.expectedDischarge}
              onChange={(e) => setNewPatient({ ...newPatient, expectedDischarge: e.target.value })}
            />
            
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => {
                  setOpen(false);
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAssignBed}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedManagement;