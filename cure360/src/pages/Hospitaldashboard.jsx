import React, { useState } from 'react';

const HospitalDashboard = () => {
  const today = new Date().toLocaleDateString();
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Improved Navbar */}
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
        {/* Date */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard – {today}</h1>
        
        {/* Summary Cards - Improved styling and spacing */}
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
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <section className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">{title}</h2>
    {children}
  </section>
);

const NavButton = ({ label, active, onClick }) => (
  <button 
    className={`py-2 px-1 transition-all duration-200 border-b-2 ${
      active 
        ? "text-blue-600 border-blue-600 font-semibold" 
        : "text-gray-700 border-transparent hover:text-blue-600 hover:border-blue-300"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const OccupancyItem = ({ ward, percentage, critical }) => {
  let barColor = "bg-green-500";
  if (percentage > 80) barColor = "bg-red-500";
  else if (percentage > 60) barColor = "bg-yellow-500";
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-700">{ward}</span>
        <span className={`font-semibold ${critical ? "text-red-600" : "text-gray-900"}`}>
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${barColor} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ListItem = ({ text, subtext, status }) => {
  let statusColor = "";
  if (status === "critical") statusColor = "text-red-600";
  else if (status === "warning") statusColor = "text-yellow-600";
  
  return (
    <li className="py-3 flex justify-between items-center">
      <span className={`font-medium ${statusColor}`}>{text}</span>
      <span className="text-sm text-gray-500">{subtext}</span>
    </li>
  );
};

export default HospitalDashboard;