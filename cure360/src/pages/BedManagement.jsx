import React, { useState } from 'react';
import {
  Hospital,
  UserPlus,
  Check,
  X,
  Calendar,
  Clock,
  ChevronDown
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
          admissionDate: '2025-04-26', 
          expectedDischarge: '2025-04-28' 
        } : null
      }))
    }
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [activeTab, setActiveTab] = useState('icu');
  const [newPatient, setNewPatient] = useState({
    name: "",
    admissionDate: new Date().toISOString().split("T")[0],
    expectedDischarge: "",
    department: "",
  });

  const handleAssignBed = () => {
    const department = newPatient.department.toLowerCase();
    const updatedBeds = { ...beds };
    const bedToUpdate = updatedBeds[department].beds.find(
      (bed) => bed.id === selectedBed
    );

    if (bedToUpdate) {
      bedToUpdate.status = "occupied";
      bedToUpdate.patient = {
        name: newPatient.name,
        admissionDate: newPatient.admissionDate,
        expectedDischarge: newPatient.expectedDischarge,
      };
      updatedBeds[department].occupied += 1;
      updatedBeds.occupied += 1;
      updatedBeds.available -= 1;
      setBeds(updatedBeds);
    }

    setIsDialogOpen(false);
    setNewPatient({
      name: "",
      admissionDate: new Date().toISOString().split("T")[0],
      expectedDischarge: "",
      department: "",
    });
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Bed Management</h1>
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium">Assign Bed {selectedBed}</h3>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admission Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newPatient.admissionDate}
                    onChange={(e) => setNewPatient({...newPatient, admissionDate: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Discharge
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newPatient.expectedDischarge}
                    onChange={(e) => setNewPatient({...newPatient, expectedDischarge: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex justify-end gap-2 rounded-b-lg">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium text-white rounded ${
                  newPatient.name && newPatient.expectedDischarge
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handleAssignBed}
                disabled={!newPatient.name || !newPatient.expectedDischarge}
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