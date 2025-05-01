import React from 'react';

function Header() {
  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-btn">🔍</button>
      </div>
      <div className="header-actions">
        <button className="notification-btn">🔔</button>
        <button className="settings-btn">⚙️</button>
      </div>
    </div>
  );
}

export default Header;