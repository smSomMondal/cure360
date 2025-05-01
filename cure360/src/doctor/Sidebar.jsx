import React from 'react';

function Sidebar({ activeSection, setActiveSection }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>MediCare+</h2>
      </div>
      <div className="menu">
        <ul>
          <li 
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className="icon">📊</span>
            <span className="menu-text">Dashboard</span>
          </li>
          {/* Other menu items */}
        </ul>
      </div>
      <div className="user-profile">
        <div className="user-avatar">
          <img src="/api/placeholder/40/40" alt="Dr. Smith" />
        </div>
        <div className="user-info">
          <h4>Dr. Smith</h4>
          <p>Cardiologist</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;