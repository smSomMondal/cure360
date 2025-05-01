import React, { useState } from 'react';

function RequestCard({ request, onAccept, onReject }) {
  const [status, setStatus] = useState('pending');

  const handleAccept = () => {
    setStatus('accepted');
    setTimeout(() => onAccept(), 300);
  };

  const handleReject = () => {
    setStatus('rejected');
    setTimeout(() => onReject(), 300);
  };

  // Inline styles
  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      borderLeft: '4px solid #3498db',
      opacity: 1,
      transform: 'scale(1)'
    },
    accepted: {
      borderLeftColor: '#2ecc71',
      opacity: 0,
      transform: 'scale(0.9)'
    },
    rejected: {
      borderLeftColor: '#e74c3c',
      opacity: 0,
      transform: 'scale(0.9)'
    },
    title: {
      margin: '0 0 12px 0',
      color: '#2c3e50',
      fontSize: '18px'
    },
    detailRow: {
      display: 'flex',
      marginBottom: '8px'
    },
    detailLabel: {
      width: '100px',
      color: '#7f8c8d',
      fontWeight: '500'
    },
    detailValue: {
      flex: 1,
      color: '#2c3e50',
      wordBreak: 'break-word'
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '16px'
    },
    acceptButton: {
      padding: '8px 16px',
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontWeight: '500',
      ':hover': {
        backgroundColor: '#27ae60'
      }
    },
    rejectButton: {
      padding: '8px 16px',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontWeight: '500',
      ':hover': {
        backgroundColor: '#c0392b'
      }
    },
    disabledButton: {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  };

  // Combine base style with status style
  const cardStyle = {
    ...styles.card,
    ...(status === 'accepted' ? styles.accepted : {}),
    ...(status === 'rejected' ? styles.rejected : {})
  };

  return (
    <div style={cardStyle}>
      <h3 style={styles.title}>{request.name}</h3>
      
      <div style={styles.detailRow}>
        <span style={styles.detailLabel}>Age:</span>
        <span style={styles.detailValue}>{request.age}</span>
      </div>
      
      <div style={styles.detailRow}>
        <span style={styles.detailLabel}>Problem:</span>
        <span style={styles.detailValue}>{request.problem}</span>
      </div>
      
      <div style={styles.detailRow}>
        <span style={styles.detailLabel}>Contact:</span>
        <span style={styles.detailValue}>{request.contact}</span>
      </div>
      
      <div style={styles.detailRow}>
        <span style={styles.detailLabel}>Preferred Date:</span>
        <span style={styles.detailValue}>{request.preferredDate}</span>
      </div>
      
      <div style={styles.detailRow}>
        <span style={styles.detailLabel}>Notes:</span>
        <span style={styles.detailValue}>{request.notes}</span>
      </div>

      <div style={styles.actions}>
        <button 
          style={{
            ...styles.acceptButton,
            ...(status !== 'pending' ? styles.disabledButton : {})
          }}
          onClick={handleAccept}
          disabled={status !== 'pending'}
        >
          Accept
        </button>
        <button 
          style={{
            ...styles.rejectButton,
            ...(status !== 'pending' ? styles.disabledButton : {})
          }}
          onClick={handleReject}
          disabled={status !== 'pending'}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default RequestCard;