import React, { useState } from 'react';
import { Clock, UserPlus ,Home} from 'lucide-react';

const QueueManagement = () => {
  const [queue, setQueue] = useState([
    { id: 1, patientName: 'John Doe', department: 'General Medicine', waitTime: '15 mins', priority: 'Normal', age: 45, symptoms: 'Fever', arrivalTime: '11:30' },
    { id: 2, patientName: 'Jane Smith', department: 'Emergency', waitTime: '0 mins', priority: 'High', age: 65, symptoms: 'Chest Pain', arrivalTime: '11:45' },
  ]);

  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patientName: '',
    age: '',
    department: '',
    symptoms: '',
    priority: 'Normal'
  });

  const departments = ['Emergency', 'General Medicine', 'Pediatrics', 'Orthopedics', 'Cardiology'];

  const calculatePriority = (age, symptoms, department) => {
    if (department === 'Emergency') return 'High';
    if (age > 60) return 'Medium';
    if (symptoms.toLowerCase().includes('pain')) return 'Medium';
    return 'Normal';
  };

  const handleAddPatient = () => {
    const priority = calculatePriority(newPatient.age, newPatient.symptoms, newPatient.department);
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setQueue([...queue, {
      id: queue.length + 1,
      ...newPatient,
      priority,
      waitTime: '15 mins',
      arrivalTime: currentTime
    }]);
    
    setOpen(false);
    setNewPatient({
      patientName: '',
      age: '',
      department: '',
      symptoms: '',
      priority: 'Normal'
    });
  };

  const handleCallNext = (id) => {
    setQueue(queue.filter(patient => patient.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRowColor = (priority) => {
    switch(priority) {
      case 'High':
        return 'bg-red-50';
      case 'Medium':
        return 'bg-orange-50';
      default:
        return '';
    }
  };
  const handleNavigateHome = () => {
    window.location.href = '/home';
    // In a real app, you would use router navigation here
    // For example: router.push('/') or history.push('/') or window.location.href = '/'
  };
  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <button 
                    className="mr-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={handleNavigateHome}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </button>
        <h1 className="text-2xl font-bold">Queue Management</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          <UserPlus size={16} />
          Add Patient
        </button>
      </div>

      {/* Modal Dialog */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Register New Patient</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={newPatient.patientName}
                  onChange={(e) => setNewPatient({...newPatient, patientName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={newPatient.department}
                    onChange={(e) => setNewPatient({...newPatient, department: e.target.value})}
                  >
                    <option value="">Select</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symptoms
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows="2"
                  value={newPatient.symptoms}
                  onChange={(e) => setNewPatient({...newPatient, symptoms: e.target.value})}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button 
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleAddPatient}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queue.map((patient) => (
              <tr key={patient.id} className={getRowColor(patient.priority)}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.symptoms}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.arrivalTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{patient.waitTime}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(patient.priority)}`}>
                    {patient.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleCallNext(patient.id)}
                  >
                    Call Next
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueueManagement;