import React, { useState } from 'react';
import Sidebar from '../patient/Sidebar';
import Header from '../patient/Header';
import DashboardSection from '../patient/DashboradSection';
import ActivePatientsSection from '../patient/ActivePatientsSection';
import CheckRequestsSection from '../patient/CheckRequestsSection';
import HistorySection from '../patient/HistorySection';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [pendingRequests, setPendingRequests] = useState(3);
  const [activePatients, setActivePatients] = useState(12);
  
  return (
    <div className="app-container">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="main-content">
        <Header />
        
        {activeSection === 'dashboard' && (
          <DashboardSection 
            pendingRequests={pendingRequests} 
            activePatients={activePatients} 
          />
        )}
        
        {activeSection === 'active-patients' && (
          <ActivePatientsSection />
        )}
        
        {activeSection === 'check-requests' && (
          <CheckRequestsSection 
            pendingRequests={pendingRequests}
            setPendingRequests={setPendingRequests}
            activePatients={activePatients}
            setActivePatients={setActivePatients}
          />
        )}
        
        {activeSection === 'history' && (
          <HistorySection />
        )}
      </div>
    </div>
  );
}

export default App;