
import React, { useState,} from 'react';
import { RefreshCw, Search, Eye, Hospital, Bed, Users, Ambulance } from 'lucide-react';

const HospitalLandingPage = () => {
  // Sample data for doctors
  const initialDoctors = [
    { id: 1, name: 'Dr. John Smith', department: 'Cardiology', status: 'available', nextAvailable: 'Now', contact: '+1 (555) 123-4567' },
    { id: 2, name: 'Dr. Sarah Johnson', department: 'Neurology', status: 'busy', nextAvailable: '2:30 PM', contact: '+1 (555) 234-5678' },
    { id: 3, name: 'Dr. Michael Chen', department: 'Orthopedics', status: 'available', nextAvailable: 'Now', contact: '+1 (555) 345-6789' },
    { id: 4, name: 'Dr. Emily Davis', department: 'Pediatrics', status: 'on-leave', nextAvailable: 'Tomorrow', contact: '+1 (555) 456-7890' },
    { id: 5, name: 'Dr. Robert Wilson', department: 'Cardiology', status: 'available', nextAvailable: 'Now', contact: '+1 (555) 567-8901' },
    { id: 6, name: 'Dr. Jennifer Lopez', department: 'Gynecology', status: 'busy', nextAvailable: '3:15 PM', contact: '+1 (555) 678-9012' },
    { id: 7, name: 'Dr. David Kim', department: 'Neurology', status: 'available', nextAvailable: 'Now', contact: '+1 (555) 789-0123' },
    { id: 8, name: 'Dr. Lisa Brown', department: 'Pediatrics', status: 'available', nextAvailable: 'Now', contact: '+1 (555) 890-1234' },
    { id: 9, name: 'Dr. James Taylor', department: 'Orthopedics', status: 'busy', nextAvailable: '4:00 PM', contact: '+1 (555) 901-2345' },
    { id: 10, name: 'Dr. Patricia Garcia', department: 'Gynecology', status: 'available', nextAvailable: 'Now', contact: '+1 (555) 012-3456' }
  ];

  // Sample data for beds
  const initialBeds = [
    { ward: 'General Ward', total: 50, occupied: 32, vacant: 18, occupancyRate: 64 },
    { ward: 'ICU', total: 20, occupied: 15, vacant: 5, occupancyRate: 75 },
    { ward: 'Emergency', total: 15, occupied: 8, vacant: 7, occupancyRate: 53 },
    { ward: 'Pediatric Ward', total: 30, occupied: 18, vacant: 12, occupancyRate: 60 },
    { ward: 'Maternity Ward', total: 25, occupied: 17, vacant: 8, occupancyRate: 68 },
    { ward: 'Cardiac Care Unit', total: 15, occupied: 10, vacant: 5, occupancyRate: 67 },
    { ward: 'Surgical Ward', total: 40, occupied: 30, vacant: 10, occupancyRate: 75 }
  ];

  // State management
  const [activeTab, setActiveTab] = useState('doctors');
  const [doctors, setDoctors] = useState(initialDoctors);
  const [beds, setBeds] = useState(initialBeds);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('all');
  const [wardSearch, setWardSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtered data
  const filteredDoctors = doctors.filter(doctor => {
    const departmentMatch = departmentFilter === 'all' || doctor.department.toLowerCase() === departmentFilter.toLowerCase();
    const statusMatch = statusFilter === 'all' || doctor.status === statusFilter;
    const searchMatch = doctorSearch === '' || 
                       doctor.name.toLowerCase().includes(doctorSearch.toLowerCase()) || 
                       doctor.department.toLowerCase().includes(doctorSearch.toLowerCase());
    
    return departmentMatch && statusMatch && searchMatch;
  });

  const filteredBeds = beds.filter(bed => {
    const wardMatch = wardFilter === 'all' || bed.ward.toLowerCase().includes(wardFilter.toLowerCase());
    const searchMatch = wardSearch === '' || bed.ward.toLowerCase().includes(wardSearch.toLowerCase());
    
    return wardMatch && searchMatch;
  });

  // Calculated summary statistics
  const availableDoctorsCount = doctors.filter(doctor => doctor.status === 'available').length;
  const totalVacantBeds = beds.reduce((sum, bed) => sum + bed.vacant, 0);
  const doctorPercentage = Math.round((availableDoctorsCount / doctors.length) * 100);
  const bedOccupancyRate = Math.round(100 - ((totalVacantBeds / beds.reduce((sum, bed) => sum + bed.total, 0)) * 100));

  // Update data function (simulating API call)
  const updateData = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      // Update doctors
      const updatedDoctors = doctors.map(doctor => {
        const statuses = ['available', 'busy', 'on-leave'];
        const randomIndex = Math.floor(Math.random() * 10);
        
        if (randomIndex < 3) {
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          let nextAvailable = doctor.nextAvailable;
          
          if (newStatus === 'busy') {
            const hours = Math.floor(Math.random() * 5) + 1;
            const minutes = Math.floor(Math.random() * 60);
            nextAvailable = `${hours}:${minutes < 10 ? '0' + minutes : minutes} PM`;
          } else if (newStatus === 'available') {
            nextAvailable = 'Now';
          } else {
            nextAvailable = 'Tomorrow';
          }
          
          return { ...doctor, status: newStatus, nextAvailable };
        }
        
        return doctor;
      });
      
      // Update beds
      const updatedBeds = beds.map(bed => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        let occupied = bed.occupied;
        
        if (occupied + change >= 0 && occupied + change <= bed.total) {
          occupied += change;
          const vacant = bed.total - occupied;
          const occupancyRate = Math.round((occupied / bed.total) * 100);
          
          return { ...bed, occupied, vacant, occupancyRate };
        }
        
        return bed;
      });
      
      setDoctors(updatedDoctors);
      setBeds(updatedBeds);
      setIsRefreshing(false);
    }, 1000);
  };

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Hospital className="text-blue-500" />
            <span>CURE360</span>
          </div>
          <nav>
            <ul className="flex gap-6 text-sm">
              <li><a href="/home" className="text-white hover:text-blue-200 transition-colors">Dashboard</a></li>
              <li><a href="/home" className="text-blue-500 border-b-2 border-blue-200">Availability</a></li>
        
              <li><a href="/bedmanagement" className="text-white hover:text-blue-200 transition-colors">Bed Management</a></li>
              <li><a href="/queuemanagement" className="text-white hover:text-blue-200 transition-colors">Queue Management</a></li>
              <li><a href="/inventorymanagement" className="text-white hover:text-blue-200 transition-colors">Inventory Management</a></li>
              <li><a href="/updateBed" className="text-white hover:text-blue-200 transition-colors">update beds</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Availability Dashboard</h1>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-colors"
              onClick={updateData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Available Doctors Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium">AVAILABLE DOCTORS</div>
                  <div className="text-3xl font-bold text-gray-800">{availableDoctorsCount}</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                  <Hospital size={24} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-auto">
                <span className="text-green-500 font-medium">{doctorPercentage}%</span> of total doctors
              </div>
            </div>

            {/* Vacant Beds Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium">VACANT BEDS</div>
                  <div className="text-3xl font-bold text-gray-800">{totalVacantBeds}</div>
                </div>
                <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                  <Bed size={24} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-auto">
                <span className="text-green-500 font-medium">{bedOccupancyRate}%</span> occupancy rate
              </div>
            </div>

            {/* Current Patients Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium">CURRENT PATIENTS</div>
                  <div className="text-3xl font-bold text-gray-800">105</div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-auto">
                <span className="text-green-500 font-medium">+12</span> since yesterday
              </div>
            </div>

            {/* Emergency Capacity Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium">EMERGENCY CAPACITY</div>
                  <div className="text-3xl font-bold text-gray-800">65%</div>
                </div>
                <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                  <Ambulance size={24} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-auto">
                <span className="text-green-500 font-medium">7</span> beds available
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b border-gray-200">
            <div 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'doctors' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : ''}`}
              onClick={() => setActiveTab('doctors')}
            >
              Doctors Availability
            </div>
            <div 
              className={`px-6 py-3 cursor-pointer ${activeTab === 'beds' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : ''}`}
              onClick={() => setActiveTab('beds')}
            >
              Bed Availability
            </div>
          </div>

          {/* Doctors Tab Content */}
          {activeTab === 'doctors' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h2 className="text-xl font-bold text-gray-800">Doctors on Duty</h2>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <select 
                    className="border border-gray-200 rounded p-2 bg-white"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="gynecology">Gynecology</option>
                  </select>
                  <select 
                    className="border border-gray-200 rounded p-2 bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="on-leave">On Leave</option>
                  </select>
                  <div className="flex items-center gap-2 border border-gray-200 rounded p-2 bg-white w-full md:w-auto">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search doctors..." 
                      className="outline-none w-full"
                      value={doctorSearch}
                      onChange={(e) => setDoctorSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left text-gray-500 font-medium">Doctor Name</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Department</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Status</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Next Available</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Contact</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-50">
                        <td className="p-4 border-b border-gray-100">{doctor.name}</td>
                        <td className="p-4 border-b border-gray-100">{doctor.department}</td>
                        <td className="p-4 border-b border-gray-100">
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${doctor.status === 'available' ? 'bg-green-100 text-green-600' : ''}
                            ${doctor.status === 'busy' ? 'bg-red-100 text-red-600' : ''}
                            ${doctor.status === 'on-leave' ? 'bg-yellow-100 text-yellow-600' : ''}
                          `}>
                            {capitalizeFirstLetter(doctor.status)}
                          </span>
                        </td>
                        <td className="p-4 border-b border-gray-100">{doctor.nextAvailable}</td>
                        <td className="p-4 border-b border-gray-100">{doctor.contact}</td>
                        <td className="p-4 border-b border-gray-100">
                          <div className="flex gap-2">
                            <button className="w-8 h-8 bg-blue-100 text-blue-500 rounded flex items-center justify-center hover:bg-blue-200">
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Beds Tab Content */}
          {activeTab === 'beds' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h2 className="text-xl font-bold text-gray-800">Bed Capacity Overview</h2>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <select 
                    className="border border-gray-200 rounded p-2 bg-white"
                    value={wardFilter}
                    onChange={(e) => setWardFilter(e.target.value)}
                  >
                    <option value="all">All Wards</option>
                    <option value="general">General Ward</option>
                    <option value="icu">ICU</option>
                    <option value="emergency">Emergency</option>
                    <option value="pediatric">Pediatric</option>
                    <option value="maternity">Maternity</option>
                  </select>
                  <div className="flex items-center gap-2 border border-gray-200 rounded p-2 bg-white w-full md:w-auto">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search wards..." 
                      className="outline-none w-full"
                      value={wardSearch}
                      onChange={(e) => setWardSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left text-gray-500 font-medium">Ward/Room Type</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Total Beds</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Occupied</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Vacant</th>
                      <th className="p-4 text-left text-gray-500 font-medium">Occupancy Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBeds.map((bed, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-4 border-b border-gray-100 font-medium">{bed.ward}</td>
                        <td className="p-4 border-b border-gray-100">{bed.total}</td>
                        <td className="p-4 border-b border-gray-100">{bed.occupied}</td>
                        <td className="p-4 border-b border-gray-100">{bed.vacant}</td>
                        <td className="p-4 border-b border-gray-100">
                          {bed.occupancyRate}%
                          <div className="h-2 bg-gray-100 rounded overflow-hidden mt-1">
                            <div 
                              className={`h-full rounded ${
                                bed.occupancyRate > 70 ? 'bg-red-500' : 
                                bed.occupancyRate > 50 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${bed.occupancyRate}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© 2025 MediCare Hospital Management System</div>
          <div className="flex gap-6">
            <a href="#" className="text-white hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white hover:text-blue-500 transition-colors">Terms of Service</a>
            <a href="#" className="text-white hover:text-blue-500 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalLandingPage;