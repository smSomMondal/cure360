// App.js
import React, { useState, useEffect } from 'react';
import './doctor.css';
import { useNavigate } from 'react-router-dom';

function Doctor() {
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
          <li 
            className={activeSection === 'active-patients' ? 'active' : ''}
            onClick={() => setActiveSection('active-patients')}
          >
            <span className="icon">👥</span>
            <span className="menu-text">Active Patients</span>
          </li>
          <li 
            className={activeSection === 'check-requests' ? 'active' : ''}
            onClick={() => setActiveSection('check-requests')}
          >
            <span className="icon">📝</span>
            <span className="menu-text">Check Requests</span>
          </li>
          <li 
            className={activeSection === 'history' ? 'active' : ''}
            onClick={() => setActiveSection('history')}
          >
            <span className="icon">📚</span>
            <span className="menu-text">History</span>
          </li>
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

function Header() {
  const nave = useNavigate()
  return (
    <div className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-btn">🔍</button>
      </div>
      <div className="header-actions">
        <button className="notification-btn">🔔</button>
        <button className="settings-btn" onClick={()=>nave('/addDoctor')}>⚙️</button>
      </div>
    </div>
  );
}

function DashboardSection({ pendingRequests, activePatients }) {
  return (
    <div className="content-section" id="dashboard-section">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className="stat-card">
          <div className="stat-icon patient-icon">👥</div>
          <div className="stat-info">
            <h3>Active Patients</h3>
            <p className="stat-number">{activePatients}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon request-icon">📝</div>
          <div className="stat-info">
            <h3>Pending Requests</h3>
            <p className="stat-number">{pendingRequests}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon appointment-icon">📅</div>
          <div className="stat-info">
            <h3>Appointments Today</h3>
            <p className="stat-number">5</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon task-icon">✓</div>
          <div className="stat-info">
            <h3>Completed Checks</h3>
            <p className="stat-number">18</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-recent">
        <h2>Recent Activities</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📋</div>
            <div className="activity-details">
              <h4>Prescription sent to Sarah Johnson</h4>
              <p>10 minutes ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📞</div>
            <div className="activity-details">
              <h4>Call with Michael Brown completed</h4>
              <p>1 hour ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">✓</div>
            <div className="activity-details">
              <h4>Check request from David Wilson accepted</h4>
              <p>2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <div className="content-section" id="active-patients-section">
      <div className="section-header">
        <h1>Active Patients</h1>
        <div className="section-actions">
          <input 
            type="text" 
            placeholder="Search patients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="patients-table-container">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Main Problem</th>
              <th>Next Check</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.problem}</td>
                <td>{patient.checkDate}</td>
                <td>
                  <span className={`status-badge ${patient.status === 'Critical' ? 'status-critical' : patient.status === 'Regular Check' ? 'status-regular' : 'status-followup'}`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <button className="btn-action">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
    // Animation is handled by CSS transitions in React
    setTimeout(() => {
      setPatientDetailModal(request);
      
      // Remove the request from the list
      setRequests(requests.filter(r => r.id !== request.id));
      
      // Update counters
      setPendingRequests(pendingRequests - 1);
      setActivePatients(activePatients + 1);
    }, 300);
  };

  const handleReject = (id) => {
    // Animation is handled by CSS transitions
    setTimeout(() => {
      alert(`Check request has been rejected.`);
      setRequests(requests.filter(request => request.id !== id));
      setPendingRequests(pendingRequests - 1);
    }, 300);
  };

  return (
    <div className="content-section" id="check-requests-section">
      <h1>Check Requests</h1>
      
      <div className="request-cards">
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
          <p className="no-data-message">No pending check requests at this time.</p>
        )}
      </div>

      {patientDetailModal && (
        <PatientDetailModal 
          patient={patientDetailModal} 
          onClose={() => setPatientDetailModal(null)}
          onPrescription={() => {
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

function RequestCard({ request, onAccept, onReject }) {
  const [status, setStatus] = useState('pending'); // pending, accepted, rejected

  const handleAccept = () => {
    setStatus('accepted');
    setTimeout(() => onAccept(), 300);
  };

  const handleReject = () => {
    setStatus('rejected');
    setTimeout(() => onReject(), 300);
  };

  return (
    <div className={`request-card ${status}`}>
      <h3>{request.name}</h3>
      <div className="request-details">
        <div className="detail-row">
          <span className="detail-label">Age:</span>
          <span className="detail-value">{request.age}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Problem:</span>
          <span className="detail-value">{request.problem}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Contact:</span>
          <span className="detail-value">{request.contact}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Preferred Date:</span>
          <span className="detail-value">{request.preferredDate}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Notes:</span>
          <span className="detail-value">{request.notes}</span>
        </div>
      </div>
      <div className="request-actions">
        <button className="btn-accept" onClick={handleAccept}>Accept</button>
        <button className="btn-reject" onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
}

function PatientDetailModal({ patient, onClose, onPrescription }) {
  // Generate a random patient ID for demo purposes
  const patientId = React.useMemo(() => Math.floor(Math.random() * 1000000).toString().padStart(6, '0'), []);

  return (
    <div className="patient-detail-modal" onClick={(e) => {
      if (e.target.className === 'patient-detail-modal') onClose();
    }}>
      <div className="patient-detail-content">
        <div className="patient-detail-header">
          <h2>Patient Details</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <div className="patient-detail-body">
          <div className="patient-profile">
            <div className="patient-avatar">
              <img src="/api/placeholder/120/120" alt="Patient" />
            </div>
            <div className="patient-basic-info">
              <h3>{patient.name}</h3>
              <p className="patient-id">ID: PAT-{patientId}</p>
              <p className="patient-age">Age: {patient.age}</p>
              <p className="patient-contact">Contact: {patient.contact}</p>
            </div>
          </div>
          
          <div className="appointment-info">
            <h4>Appointment Details</h4>
            <div className="info-row">
              <span className="info-label">Scheduled Date:</span>
              <span className="info-value">{patient.preferredDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Primary Complaint:</span>
              <span className="info-value">{patient.problem}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Patient Notes:</span>
              <span className="info-value">{patient.notes}</span>
            </div>
          </div>
          
          <div className="medical-history">
            <h4>Medical History</h4>
            <div className="medical-history-item">
              <div className="history-date">Mar 15, 2025</div>
              <div className="history-details">
                <p className="history-condition">Upper Respiratory Infection</p>
                <p className="history-treatment">Prescribed amoxicillin 500mg TID for 7 days</p>
              </div>
            </div>
            <div className="medical-history-item">
              <div className="history-date">Jan 08, 2025</div>
              <div className="history-details">
                <p className="history-condition">Annual Physical Examination</p>
                <p className="history-treatment">All vitals normal. Recommended vitamin D supplement.</p>
              </div>
            </div>
          </div>
          
          <div className="allergies-medications">
            <div className="allergies">
              <h4>Allergies</h4>
              <ul>
                <li>Penicillin</li>
                <li>Dust mites</li>
              </ul>
            </div>
            <div className="current-medications">
              <h4>Current Medications</h4>
              <ul>
                <li>Loratadine 10mg daily</li>
                <li>Vitamin D3 1000 IU daily</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="patient-action-buttons">
          <button className="patient-action-btn btn-prescription" onClick={onPrescription}>
            Send Prescription
          </button>
          <button className="patient-action-btn btn-call" onClick={() => alert(`Initiating call to ${patient.name} at ${patient.contact}`)}>
            Call Patient
          </button>
          <button className="patient-action-btn btn-chat" onClick={() => alert(`Opening chat with ${patient.name}`)}>
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}

function PrescriptionModal({ patient, onClose }) {
  const [medications, setMedications] = useState([]);
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medFrequency, setMedFrequency] = useState('');
  const [medDuration, setMedDuration] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Current date for prescription
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const addMedication = () => {
    if (medName.trim() === '') return;
    
    setMedications([
      ...medications,
      {
        id: Date.now(),
        name: medName,
        dosage: medDosage,
        frequency: medFrequency,
        duration: medDuration
      }
    ]);
    
    // Clear inputs
    setMedName('');
    setMedDosage('');
    setMedFrequency('');
    setMedDuration('');
  };

  const removeMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleSendPrescription = () => {
    if (medications.length === 0) {
      alert('Please add at least one medication to the prescription.');
      return;
    }
    
    alert(`Prescription for ${patient.name} has been sent successfully!`);
    onClose();
  };

  return (
    <div className="prescription-modal">
      <div className="prescription-content">
        <div className="prescription-header">
          <h2>Write Prescription</h2>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        
        <div className="prescription-form">
          <div className="prescription-patient-info">
            <div className="info-group">
              <label>Patient Name:</label>
              <p>{patient.name}</p>
            </div>
            <div className="info-group">
              <label>Age:</label>
              <p>{patient.age}</p>
            </div>
            <div className="info-group">
              <label>Date:</label>
              <p>{formattedDate}</p>
            </div>
            <div className="info-group">
              <label>Condition:</label>
              <p>{patient.problem}</p>
            </div>
          </div>
          
          <div className="prescription-medications">
            <h3>Medications</h3>
            <div className="medication-inputs">
              <div className="medication-row">
                <input 
                  type="text" 
                  placeholder="Medication name" 
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Dosage" 
                  value={medDosage}
                  onChange={(e) => setMedDosage(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Frequency" 
                  value={medFrequency}
                  onChange={(e) => setMedFrequency(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Duration" 
                  value={medDuration}
                  onChange={(e) => setMedDuration(e.target.value)}
                />
                <button className="add-medication" onClick={addMedication}>+</button>
              </div>
            </div>
            <div className="medications-list">
              {medications.map(med => (
                <div key={med.id} className="medication-item">
                  <div className="medication-details">
                    <p className="med-name-display">{med.name}</p>
                    <p className="med-details-display">{med.dosage} - {med.frequency} - {med.duration}</p>
                  </div>
                  <button 
                    className="remove-medication" 
                    onClick={() => removeMedication(med.id)}
                  >×</button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="prescription-notes">
            <h3>Additional Instructions</h3>
            <textarea 
              placeholder="Enter any additional instructions for the patient..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            ></textarea>
          </div>
          
          <div className="prescription-actions">
            <button 
              className="btn-send-prescription"
              onClick={handleSendPrescription}
            >
              Send Prescription
            </button>
            <button 
              className="btn-save-draft"
              onClick={() => alert('Prescription draft has been saved.')}
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistorySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    return oneMonthAgo.toISOString().split('T')[0];
  });
  const [dateTo, setDateTo] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [historyData, setHistoryData] = useState([
    { name: 'Sarah Johnson', date: '2025-04-15', diagnosis: 'Hypertension', treatment: 'Prescribed Lisinopril 10mg daily' },
    { name: 'Michael Brown', date: '2025-04-10', diagnosis: 'Diabetes Type 2', treatment: 'Adjusted Metformin dosage' },
    { name: 'David Wilson', date: '2025-04-05', diagnosis: 'Upper Respiratory Infection', treatment: 'Prescribed antibiotics' },
    { name: 'Emma Davis', date: '2025-03-28', diagnosis: 'Pregnancy Check', treatment: 'Prenatal vitamins, scheduled next visit' },
    { name: 'Linda Martinez', date: '2025-03-20', diagnosis: 'Arthritis', treatment: 'Anti-inflammatory medication' }
  ]);

  const [filteredHistory, setFilteredHistory] = useState(historyData);
  const [recordModal, setRecordModal] = useState(null);

  // Filter by search term and date range
  useEffect(() => {
    const filtered = historyData.filter(record => {
      const matchesSearch = 
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.treatment.toLowerCase().includes(searchTerm.toLowerCase());
      
      const recordDate = new Date(record.date);
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      
      const matchesDateRange = recordDate >= fromDate && recordDate <= toDate;
      
      return matchesSearch && matchesDateRange;
    });
    
    setFilteredHistory(filtered);
  }, [searchTerm, dateFrom, dateTo, historyData]);

  const handleFilter = () => {
    // Validation is already handled in the useEffect
    if (isNaN(new Date(dateFrom).getTime()) || isNaN(new Date(dateTo).getTime())) {
      alert('Please select valid date range');
    }
  };

  const viewRecord = (record) => {
    setRecordModal(record);
  };

  return (
    <div className="content-section" id="history-section">
      <h1>Patient History</h1>
      
      <div className="history-filters">
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search patient history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="date-filter">
          <label>From:</label>
          <input 
            type="date" 
            id="date-from" 
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <label>To:</label>
          <input 
            type="date" 
            id="date-to" 
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <button className="btn-filter" onClick={handleFilter}>Filter</button>
        </div>
      </div>
      
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Visit Date</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.diagnosis}</td>
                <td>{record.treatment}</td>
                <td>
                  <button 
                    className="btn-action"
                    onClick={() => viewRecord(record)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredHistory.length === 0 && (
          <p className="no-data-message">No records found matching your criteria.</p>
        )}
      </div>

      {recordModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setRecordModal(null)}>&times;</span>
            <h2>Patient Record</h2>
            <div className="record-details">
              <div className="record-row">
                <span className="record-label">Patient:</span>
                <span className="record-value">{recordModal.name}</span>
              </div>
              <div className="record-row">
                <span className="record-label">Visit Date:</span>
                <span className="record-value">{new Date(recordModal.date).toLocaleDateString()}</span>
              </div>
              <div className="record-row">
                <span className="record-label">Diagnosis:</span>
                <span className="record-value">{recordModal.diagnosis}</span>
              </div>
              <div className="record-row">
                <span className="record-label">Treatment:</span>
                <span className="record-value">{recordModal.treatment}</span>
              </div>
              <div className="record-row">
                <span className="record-label">Notes:</span>
                <span className="record-value">Patient responded well to treatment. Follow-up scheduled in 2 weeks.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctor;