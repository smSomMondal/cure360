import React, { useState } from 'react';

function ActivePatientsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([
    { name: 'Sarah Johnson', age: '45', problem: 'Hypertension', checkDate: '15 Apr 2025', status: 'Follow-up' },
    { name: 'Michael Brown', age: '38', problem: 'Diabetes Type 2', checkDate: '16 Apr 2025', status: 'Medication Review' },
    { name: 'Emma Davis', age: '29', problem: 'Pregnancy Check', checkDate: '17 Apr 2025', status: 'Regular Check' },
    { name: 'James Wilson', age: '52', problem: 'Post-op Recovery', checkDate: '18 Apr 2025', status: 'Critical' },
    { name: 'Linda Martinez', age: '61', problem: 'Arthritis', checkDate: '19 Apr 2025', status: 'Follow-up' }
  ]);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    section: {
      padding: '2rem',
      backgroundColor: '#f5f7fa',
      borderRadius: '8px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    heading: {
      color: '#2c3e50',
      fontSize: '2rem',
      margin: 0
    },
    searchInput: {
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      minWidth: '250px',
      fontSize: '1rem'
    },
    tableContainer: {
      overflowX: 'auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#3498db',
      color: 'white',
      textAlign: 'left'
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #ecf0f1'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    statusCritical: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c'
    },
    statusRegular: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    statusFollowup: {
      backgroundColor: '#fef9c3',
      color: '#854d0e'
    },
    actionButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: '#2980b9'
      }
    },
    noPatients: {
      textAlign: 'center',
      padding: '2rem',
      color: '#7f8c8d'
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Critical':
        return { ...styles.statusBadge, ...styles.statusCritical };
      case 'Regular Check':
        return { ...styles.statusBadge, ...styles.statusRegular };
      default:
        return { ...styles.statusBadge, ...styles.statusFollowup };
    }
  };

  return (
    <div style={styles.section} id="active-patients-section">
      <div style={styles.header}>
        <h1 style={styles.heading}>Active Patients</h1>
        <input 
          type="text" 
          placeholder="Search patients..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      
      <div style={styles.tableContainer}>
        {filteredPatients.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Patient Name</th>
                <th style={styles.tableCell}>Age</th>
                <th style={styles.tableCell}>Main Problem</th>
                <th style={styles.tableCell}>Next Check</th>
                <th style={styles.tableCell}>Status</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{patient.name}</td>
                  <td style={styles.tableCell}>{patient.age}</td>
                  <td style={styles.tableCell}>{patient.problem}</td>
                  <td style={styles.tableCell}>{patient.checkDate}</td>
                  <td style={styles.tableCell}>
                    <span style={getStatusStyle(patient.status)}>
                      {patient.status}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <button style={styles.actionButton}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={styles.noPatients}>
            <p>No patients found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivePatientsSection;