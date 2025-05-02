import React, { useState } from "react";
import { Check, X, Calendar, Clock, UserPlus, Hospital } from "lucide-react";

const BedManagement = () => {
  const [beds, setBeds] = useState({
    total: 100,
    occupied: 75,
    available: 25,
    icu: {
      total: 20,
      occupied: 15,
      beds: Array(20)
        .fill(null)
        .map((_, i) => ({
          id: `ICU-${i + 1}`,
          status: i < 15 ? "occupied" : "available",
          patient:
            i < 15
              ? {
                  name: `Patient ${i + 1}`,
                  admissionDate: "2025-04-25",
                  expectedDischarge: "2025-04-30",
                }
              : null,
        })),
    },
    general: {
      total: 60,
      occupied: 45,
      beds: Array(60)
        .fill(null)
        .map((_, i) => ({
          id: `GEN-${i + 1}`,
          status: i < 45 ? "occupied" : "available",
          patient:
            i < 45
              ? {
                  name: `Patient ${i + 1}`,
                  admissionDate: "2025-04-25",
                  expectedDischarge: "2025-04-29",
                }
              : null,
        })),
    },
    emergency: {
      total: 20,
      occupied: 15,
      beds: Array(20)
        .fill(null)
        .map((_, i) => ({
          id: `EMG-${i + 1}`,
          status: i < 15 ? "occupied" : "available",
          patient:
            i < 15
              ? {
                  name: `Patient ${i + 1}`,
                  admissionDate: "2025-04-26",
                  expectedDischarge: "2025-04-28",
                }
              : null,
        })),
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
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

  // Component for stats card
  const StatsCard = ({ title, total, available, occupied, icon }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-3xl font-bold">{total}</p>
      <div className="flex gap-2 mt-2">
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
          Available: {available}
        </span>
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
          Occupied: {occupied}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bed Management</h1>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            selectedBed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => selectedBed && setIsDialogOpen(true)}
          disabled={!selectedBed}
        >
          <UserPlus size={18} />
          Assign Bed
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Beds"
          total={beds.total}
          available={beds.available}
          occupied={beds.occupied}
          icon={<Hospital className="text-blue-600" size={20} />}
        />
        <StatsCard
          title="ICU BEDS"
          total={beds.icu.total}
          available={beds.icu.total - beds.icu.occupied}
          occupied={beds.icu.occupied}
          icon={<Hospital className="text-blue-600" size={20} />}
        />
        <StatsCard
          title="GENERAL BEDS"
          total={beds.general.total}
          available={beds.general.total - beds.general.occupied}
          occupied={beds.general.occupied}
          icon={<Hospital className="text-blue-600" size={20} />}
        />
        <StatsCard
          title="EMERGENCY BEDS"
          total={beds.emergency.total}
          available={beds.emergency.total - beds.emergency.occupied}
          occupied={beds.emergency.occupied}
          icon={<Hospital className="text-blue-600" size={20} />}
        />
      </div>

      {["icu", "general", "emergency"].map((dept) => (
        <div className="mb-8" key={dept}>
          <h2 className="text-xl font-semibold mb-4 uppercase">
            {dept} Ward Status
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bed ID
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admission Date
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected Discharge
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {beds[dept].beds.map((bed) => (
                  <tr key={bed.id}>
                    <td className="py-3 px-4 text-sm">{bed.id}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          bed.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {bed.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {bed.patient?.name || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {bed.patient?.admissionDate || "-"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {bed.patient?.expectedDischarge || "-"}
                    </td>
                    <td className="py-3 px-4">
                      {bed.status === "available" ? (
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Select for assignment"
                          onClick={() => {
                            setSelectedBed(bed.id);
                            setNewPatient({ ...newPatient, department: dept });
                            setIsDialogOpen(true);
                          }}
                        >
                          <UserPlus size={18} />
                        </button>
                      ) : (
                        <button
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Discharge patient"
                          onClick={() => handleDischargeBed(dept, bed.id)}
                        >
                          <X size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Modal Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Assign Bed {selectedBed}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="patientName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientName"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  value={newPatient.name}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="admissionDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Admission Date
                  </label>
                  <input
                    type="date"
                    id="admissionDate"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    value={newPatient.admissionDate}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        admissionDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="dischargeDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expected Discharge
                  </label>
                  <input
                    type="date"
                    id="dischargeDate"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    value={newPatient.expectedDischarge}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        expectedDischarge: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  !newPatient.name || !newPatient.expectedDischarge
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
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