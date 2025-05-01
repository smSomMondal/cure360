import React, { useState } from 'react';
import RequestCard from './RequestCard';
import PatientDetailModal from './modals/PatientDetailModal';
import PrescriptionModal from './modals/PrescriptionModal';

function CheckRequestsSection({ pendingRequests, setPendingRequests, activePatients, setActivePatients }) {
  const [requests, setRequests] = useState([
    { 
      id: 1,
      name: 'Robert Thompson', 
      age: '42', 
      problem: 'Persistent cough and fever for 3 days', 
      contact: '+1 (555) 123-4567', 
      preferredDate: 'April 20, 2025', 
      notes: 'History of asthma, currently using inhaler.' 
    },
    { 
      id: 2,
      name: 'Jennifer Adams', 
      age: '35', 
      problem: 'Severe migraine headaches', 
      contact: '+1 (555) 987-6543', 
      preferredDate: 'April 21, 2025', 
      notes: 'Episodes increasing in frequency, family history of migraines.' 
    },
    { 
      id: 3,
      name: 'Carlos Rodriguez', 
      age: '27', 
      problem: 'Lower back pain after lifting weights', 
      contact: '+1 (555) 345-6789', 
      preferredDate: 'April 22, 2025', 
      notes: 'No previous history of back problems, pain increasing with movement.' 
    }
  ]);

  const [patientDetailModal, setPatientDetailModal] = useState(null);
  const [prescriptionModal, setPrescriptionModal] = useState(null);

  const handleAccept = (request) => {
    setTimeout(() => {
      setPatientDetailModal(request);
      setRequests(requests.filter(r => r.id !== request.id));
      setPendingRequests(pendingRequests - 1);
      setActivePatients(activePatients + 1);
    }, 300);
  };

  const handleReject = (id) => {
    setTimeout(() => {
      setRequests(requests.filter(request => request.id !== id));
      setPendingRequests(pendingRequests - 1);
    }, 300);
  };

  const styles = {
    section: {
      padding: '2rem',
      backgroundColor: '#f5f7fa',
      borderRadius: '8px'
    },
    heading: {
      marginBottom: '2rem',
      color: '#2c3e50',
      fontSize: '2rem'
    },
    requestCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    noRequests: {
      textAlign: 'center',
      padding: '2rem',
      color: '#7f8c8d',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  return (
    <div style={styles.section} id="check-requests-section">
      <h1 style={styles.heading}>Check Requests</h1>
      
      <div style={styles.requestCards}>
        {requests.length > 0 ? (
          requests.map(request => (
            <RequestCard 
              key={request.id}
              request={request} 
              onAccept={() => handleAccept(request)} 
              onReject={() => handleReject(request.id)} 
            />
          ))
        ) : (
          <div style={styles.noRequests}>
            <p>No pending check requests at this time.</p>
          </div>
        )}
      </div>

      {patientDetailModal && (
        <PatientDetailModal 
          patient={patientDetailModal} 
          onClose={() => setPatientDetailModal(null)}
          onPrescription={() => {
            setPatientDetailModal(null);
            setPrescriptionModal(patientDetailModal);
          }}
        />
      )}

      {prescriptionModal && (
        <PrescriptionModal 
          patient={prescriptionModal} 
          onClose={() => setPrescriptionModal(null)}
        />
      )}
    </div>
  );
}

export default CheckRequestsSection;