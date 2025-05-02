import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Home, Clock, Users, Building, PlusCircle, RefreshCw, Bed
} from 'lucide-react';

// Mock data for hospital bed availability
const initialData = {
  generalWard: { total: 50, occupied: 32, available: 18 },
  icu: { total: 20, occupied: 15, available: 5 },
  emergency: { total: 15, occupied: 10, available: 5 },
  pediatric: { total: 25, occupied: 18, available: 7 },
  maternity: { total: 30, occupied: 24, available: 6 }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function HospitalDashboard() {
  const [data, setData] = useState(initialData);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(false);
  
  // Function to simulate refreshing data
  const refreshData = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate slightly different data to simulate real-time updates
      const newData = {};
      Object.keys(data).forEach(ward => {
        const total = data[ward].total;
        // Randomly change occupancy within reasonable bounds
        const occupied = Math.max(0, Math.min(total, data[ward].occupied + Math.floor(Math.random() * 7) - 3));
        newData[ward] = {
          total,
          occupied,
          available: total - occupied
        };
      });
      
      setData(newData);
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };
  
  // Calculate total beds and availability
  const totalBeds = Object.values(data).reduce((sum, ward) => sum + ward.total, 0);
  const totalAvailable = Object.values(data).reduce((sum, ward) => sum + ward.available, 0);
  const occupancyRate = Math.round((1 - totalAvailable / totalBeds) * 100);
  
  // Format data for charts
  const barChartData = Object.keys(data).map(ward => ({
    name: ward.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    Available: data[ward].available,
    Occupied: data[ward].occupied
  }));
  
  const pieChartData = [
    { name: 'Available', value: totalAvailable },
    { name: 'Occupied', value: totalBeds - totalAvailable }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8" />
            <h1 className="text-2xl font-bold">City General Hospital</h1>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <button 
              onClick={refreshData} 
              className="ml-2 flex items-center bg-blue-500 hover:bg-blue-400 rounded-full p-1"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Stats Overview */}
      <div className="container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Beds Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Bed className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Total Beds</h3>
              <p className="text-2xl font-bold">{totalBeds}</p>
            </div>
          </div>
          
          {/* Available Beds Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Bed className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Available Beds</h3>
              <p className="text-2xl font-bold">{totalAvailable}</p>
            </div>
          </div>
          
          {/* Occupancy Rate Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Occupancy Rate</h3>
              <p className="text-2xl font-bold">{occupancyRate}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="container mx-auto mt-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Bed Availability by Ward</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Available" fill="#4ADE80" />
                <Bar dataKey="Occupied" fill="#FB7185" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Overall Bed Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4ADE80' : '#FB7185'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Detailed Ward Table */}
      <div className="container mx-auto mt-8 px-4 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Ward Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Beds</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.keys(data).map((ward) => (
                  <tr key={ward}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ward.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data[ward].total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data[ward].occupied}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data[ward].available}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        data[ward].available === 0 ? 'bg-red-100 text-red-800' : 
                        data[ward].available < 5 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {data[ward].available === 0 ? 'Full' : 
                         data[ward].available < 5 ? 'Limited' : 
                         'Available'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center">
          <PlusCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}