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
  
  // Render the appropriate component based on activeNavItem
  const renderContent = () => {
    switch(activeNavItem) {
      case "Bed Management":
        return <BedManagement />;
      default:
        return (
          <>
            {/* Dashboard Content */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard – {today}</h1>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <SummaryCard 
                title="Bed Occupancy" 
                value="72%" 
                icon="🛏️" 
                color="bg-blue-100" 
                textColor="text-blue-700" 
              />
              <SummaryCard 
                title="Patients Discharged" 
                value="15" 
                icon="📤" 
                color="bg-green-100" 
                textColor="text-green-700" 
              />
              <SummaryCard 
                title="Inventory Alerts" 
                value="2 critical" 
                icon="📦" 
                color="bg-red-100" 
                textColor="text-red-700" 
              />
            </div>
            
            {/* Bed Occupancy Analysis */}
            <Section title="Bed Occupancy Analysis">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <OccupancyItem ward="Ward A" percentage={85} critical={true} />
                <OccupancyItem ward="Ward B" percentage={68} />
                <OccupancyItem ward="ICU" percentage={90} critical={true} />
                <OccupancyItem ward="General" percentage={50} />
              </div>
            </Section>
            
            {/* Recent Admissions and Inventory Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Section title="Recent Admissions">
                <ul className="divide-y divide-gray-200">
                  <ListItem text="John Doe" subtext="Ward B" />
                  <ListItem text="Jane Smith" subtext="ICU" status="critical" />
                  <ListItem text="Michael Brown" subtext="General" />
                </ul>
              </Section>
              
              <Section title="Inventory Alerts">
                <ul className="divide-y divide-gray-200">
                  <ListItem text="Gloves" subtext="Low stock" status="warning" />
                  <ListItem text="Saline" subtext="Out of stock" status="critical" />
                  <ListItem text="Masks" subtext="Running low" status="warning" />
                </ul>
              </Section>
            </div>
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-lg p-4 flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <div className="flex items-center">
            <span className="text-3xl mr-2">🏥</span>
            <span className="text-2xl font-extrabold text-blue-700 tracking-tight">Cure360 Admin</span>
          </div>
          <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="space-x-8 font-medium hidden md:flex">
          {["Dashboard", "Queue Management", "Bed Management", "Inventory Management", "Profile"].map(item => (
            <NavButton 
              key={item} 
              label={item} 
              active={activeNavItem === item}
              onClick={() => setActiveNavItem(item)} 
            />
          ))}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color, textColor }) => (
  <div className={`rounded-xl shadow-md hover:shadow-lg transition duration-300 ${color} border border-gray-100 overflow-hidden`}>
    <div className="p-6">
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className={`text-md font-medium ${textColor}`}>{title}</h3>
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
  </div>
  );  
