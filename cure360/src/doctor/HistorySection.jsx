import React, { useState, useEffect } from 'react';

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
    if (isNaN(new Date(dateFrom).getTime()) || isNaN(new Date(dateTo).getTime())) {
      alert('Please select valid date range');
    }
  };

  const viewRecord = (record) => {
    setRecordModal(record);
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
    filters: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    searchFilter: {
      flex: 1,
      minWidth: '200px'
    },
    searchInput: {
      width: '100%',
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem'
    },
    dateFilter: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    dateLabel: {
      marginRight: '0.5rem',
      color: '#7f8c8d'
    },
    dateInput: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ddd'
    },
    filterButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#2980b9'
      }
    },
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
    actionButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#27ae60'
      }
    },
    noData: {
      textAlign: 'center',
      padding: '2rem',
      color: '#7f8c8d'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      maxWidth: '600px',
      width: '90%',
      position: 'relative'
    },
    closeModal: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      fontSize: '1.5rem',
      cursor: 'pointer',
      background: 'none',
      border: 'none'
    },
    recordRow: {
      marginBottom: '1rem',
      display: 'flex'
    },
    recordLabel: {
      fontWeight: 'bold',
      width: '120px',
      color: '#7f8c8d'
    },
    recordValue: {
      flex: 1
    }
  };

  return (
    <div style={styles.section} id="history-section">
      <h1 style={styles.heading}>Patient History</h1>
      
      <div style={styles.filters}>
        <div style={styles.searchFilter}>
          <input 
            type="text" 
            placeholder="Search patient history..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.dateFilter}>
          <label style={styles.dateLabel}>From:</label>
          <input 
            type="date" 
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={styles.dateInput}
          />
          <label style={styles.dateLabel}>To:</label>
          <input 
            type="date" 
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={styles.dateInput}
          />
          <button style={styles.filterButton} onClick={handleFilter}>Filter</button>
        </div>
      </div>
      
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Patient Name</th>
              <th style={styles.tableCell}>Visit Date</th>
              <th style={styles.tableCell}>Diagnosis</th>
              <th style={styles.tableCell}>Treatment</th>
              <th style={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((record, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{record.name}</td>
                <td style={styles.tableCell}>{new Date(record.date).toLocaleDateString()}</td>
                <td style={styles.tableCell}>{record.diagnosis}</td>
                <td style={styles.tableCell}>{record.treatment}</td>
                <td style={styles.tableCell}>
                  <button 
                    style={styles.actionButton}
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
          <p style={styles.noData}>No records found matching your criteria.</p>
        )}
      </div>

      {recordModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button style={styles.closeModal} onClick={() => setRecordModal(null)}>&times;</button>
            <h2>Patient Record</h2>
            <div>
              <div style={styles.recordRow}>
                <span style={styles.recordLabel}>Patient:</span>
                <span style={styles.recordValue}>{recordModal.name}</span>
              </div>
              <div style={styles.recordRow}>
                <span style={styles.recordLabel}>Visit Date:</span>
                <span style={styles.recordValue}>{new Date(recordModal.date).toLocaleDateString()}</span>
              </div>
              <div style={styles.recordRow}>
                <span style={styles.recordLabel}>Diagnosis:</span>
                <span style={styles.recordValue}>{recordModal.diagnosis}</span>
              </div>
              <div style={styles.recordRow}>
                <span style={styles.recordLabel}>Treatment:</span>
                <span style={styles.recordValue}>{recordModal.treatment}</span>
              </div>
              <div style={styles.recordRow}>
                <span style={styles.recordLabel}>Notes:</span>
                <span style={styles.recordValue}>Patient responded well to treatment. Follow-up scheduled in 2 weeks.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistorySection;