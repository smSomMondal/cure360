import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip
} from '@mui/material';
import { AccessTime, Priority, PersonAdd } from '@mui/icons-material';

const QueueManagement = () => {
  const [queue, setQueue] = useState([
    { id: 1, patientName: 'John Doe', department: 'General Medicine', waitTime: '15 mins', priority: 'Normal', age: 45, symptoms: 'Fever', arrivalTime: '11:30' },
    { id: 2, patientName: 'Jane Smith', department: 'Emergency', waitTime: '0 mins', priority: 'High', age: 65, symptoms: 'Chest Pain', arrivalTime: '11:45' },
  ]);

  const [open, setOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    patientName: '',
    age: '',
    department: '',
    symptoms: '',
    priority: 'Normal'
  });

  const departments = ['Emergency', 'General Medicine', 'Pediatrics', 'Orthopedics', 'Cardiology'];

  const calculatePriority = (age, symptoms, department) => {
    if (department === 'Emergency') return 'High';
    if (age > 60) return 'Medium';
    if (symptoms.toLowerCase().includes('pain')) return 'Medium';
    return 'Normal';
  };

  const handleAddPatient = () => {
    const priority = calculatePriority(newPatient.age, newPatient.symptoms, newPatient.department);
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setQueue([...queue, {
      id: queue.length + 1,
      ...newPatient,
      priority,
      waitTime: '15 mins',
      arrivalTime: currentTime
    }]);
    
    setOpen(false);
    setNewPatient({
      patientName: '',
      age: '',
      department: '',
      symptoms: '',
      priority: 'Normal'
    });
  };

  const handleCallNext = (id) => {
    setQueue(queue.filter(patient => patient.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Queue Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setOpen(true)}
        >
          Add Patient
        </Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Register New Patient</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={newPatient.patientName}
                onChange={(e) => setNewPatient({...newPatient, patientName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={newPatient.age}
                onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={newPatient.department}
                  label="Department"
                  onChange={(e) => setNewPatient({...newPatient, department: e.target.value})}
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Symptoms"
                multiline
                rows={2}
                value={newPatient.symptoms}
                onChange={(e) => setNewPatient({...newPatient, symptoms: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddPatient} variant="contained" color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token Number</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Symptoms</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Est. Wait Time</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queue.map((patient) => (
              <TableRow 
                key={patient.id}
                sx={{
                  backgroundColor: 
                    patient.priority === 'High' ? '#ffebee' :
                    patient.priority === 'Medium' ? '#fff3e0' : 'inherit'
                }}
              >
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.patientName}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.department}</TableCell>
                <TableCell>{patient.symptoms}</TableCell>
                <TableCell>{patient.arrivalTime}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                    {patient.waitTime}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={patient.priority}
                    color={
                      patient.priority === 'High' ? 'error' :
                      patient.priority === 'Medium' ? 'warning' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleCallNext(patient.id)}
                  >
                    Call Next
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default QueueManagement;
