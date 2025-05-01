import React from 'react';

function DashboardSection({ pendingRequests, activePatients }) {
  const styles = {
    section: {
      padding: '2rem',
      backgroundColor: '#f5f7fa',
      borderRadius: '8px',
      marginBottom: '2rem'
    },
    heading: {
      marginBottom: '2rem',
      color: '#2c3e50',
      fontSize: '2rem'
    },
    summary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)'
      }
    },
    statIcon: {
      fontSize: '2rem',
      marginRight: '1.5rem',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    patientIcon: { backgroundColor: '#e3f2fd', color: '#1976d2' },
    requestIcon: { backgroundColor: '#fff8e1', color: '#ffa000' },
    appointmentIcon: { backgroundColor: '#f3e5f5', color: '#8e24aa' },
    taskIcon: { backgroundColor: '#e8f5e9', color: '#43a047' },
    statInfo: {
      flex: 1
    },
    statTitle: {
      margin: 0,
      fontSize: '1rem',
      color: '#7f8c8d',
      fontWeight: 500
    },
    statNumber: {
      margin: '0.5rem 0 0',
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#2c3e50'
    },
    recentHeading: {
      marginBottom: '1.5rem',
      color: '#2c3e50',
      fontSize: '1.5rem'
    },
    activityList: {
      background: 'white',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    activityItem: {
      display: 'flex',
      padding: '1rem 0',
      borderBottom: '1px solid #ecf0f1',
      ':last-child': {
        borderBottom: 'none'
      }
    },
    activityIcon: {
      fontSize: '1.5rem',
      marginRight: '1.5rem',
      color: '#7f8c8d'
    },
    activityDetails: {
      flex: 1
    },
    activityTitle: {
      margin: 0,
      fontSize: '1rem',
      color: '#2c3e50'
    },
    activityTime: {
      margin: '0.3rem 0 0',
      fontSize: '0.9rem',
      color: '#7f8c8d'
    }
  };

  return (
    <div style={styles.section} id="dashboard-section">
      <h1 style={styles.heading}>Dashboard</h1>
      <div style={styles.summary}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, ...styles.patientIcon}}>👥</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statTitle}>Active Patients</h3>
            <p style={styles.statNumber}>{activePatients}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, ...styles.requestIcon}}>📝</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statTitle}>Pending Requests</h3>
            <p style={styles.statNumber}>{pendingRequests}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, ...styles.appointmentIcon}}>📅</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statTitle}>Appointments Today</h3>
            <p style={styles.statNumber}>5</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, ...styles.taskIcon}}>✓</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statTitle}>Completed Checks</h3>
            <p style={styles.statNumber}>18</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 style={styles.recentHeading}>Recent Activities</h2>
        <div style={styles.activityList}>
          <div style={styles.activityItem}>
            <div style={styles.activityIcon}>📋</div>
            <div style={styles.activityDetails}>
              <h4 style={styles.activityTitle}>Prescription sent to Sarah Johnson</h4>
              <p style={styles.activityTime}>10 minutes ago</p>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={styles.activityIcon}>📞</div>
            <div style={styles.activityDetails}>
              <h4 style={styles.activityTitle}>Call with Michael Brown completed</h4>
              <p style={styles.activityTime}>1 hour ago</p>
            </div>
          </div>
          <div style={styles.activityItem}>
            <div style={styles.activityIcon}>✓</div>
            <div style={styles.activityDetails}>
              <h4 style={styles.activityTitle}>Check request from David Wilson accepted</h4>
              <p style={styles.activityTime}>2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSection;