import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { LocalHospital, Event, AccessTime, PersonAdd, Check, Clear } from '@mui/icons-material';

const BedManagement = () => {
  const [beds, setBeds] = useState({
    total: 100,
    occupied: 75,
    available: 25,
    icu: { total: 20, occupied: 15, beds: Array(20).fill(null).map((_, i) => ({
      id: `ICU-${i + 1}`,
      status: i < 15 ? 'occupied' : 'available',
      patient: i < 15 ? { name: `Patient ${i + 1}`, admissionDate: '2025-04-25', expectedDischarge: '2025-04-30' } : null
    })) },
    general: { total: 60, occupied: 45, beds: Array(60).fill(null).map((_, i) => ({
      id: `GEN-${i + 1}`,
      status: i < 45 ? 'occupied' : 'available',
      patient: i < 45 ? { name: `Patient ${i + 1}`, admissionDate: '2025-04-25', expectedDischarge: '2025-04-29' } : null
    })) },
    emergency: { total: 20, occupied: 15, beds: Array(20).fill(null).map((_, i) => ({
      id: `EMG-${i + 1}`,
      status: i < 15 ? 'occupied' : 'available',
      patient: i < 15 ? { name: `Patient ${i + 1}`, admissionDate: '2025-04-26', expectedDischarge: '2025-04-28' } : null
    })) }
  });

  const [open, setOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    admissionDate: new Date().toISOString().split('T')[0],
    expectedDischarge: '',
    department: ''
  });

  const handleAssignBed = () => {
    const department = newPatient.department.toLowerCase();
    const updatedBeds = { ...beds };
    const bedToUpdate = updatedBeds[department].beds.find(bed => bed.id === selectedBed);
    
    if (bedToUpdate) {
      bedToUpdate.status = 'occupied';
      bedToUpdate.patient = {
        name: newPatient.name,
        admissionDate: newPatient.admissionDate,
        expectedDischarge: newPatient.expectedDischarge
      };
      updatedBeds[department].occupied += 1;
      setBeds(updatedBeds);
    }
    
    setOpen(false);
    setNewPatient({
      name: '',
      admissionDate: new Date().toISOString().split('T')[0],
      expectedDischarge: '',
      department: ''
    });
    setSelectedBed(null);
  };

  const handleDischargeBed = (department, bedId) => {
    const updatedBeds = { ...beds };
    const bedToUpdate = updatedBeds[department].beds.find(bed => bed.id === bedId);
    
    if (bedToUpdate) {
      bedToUpdate.status = 'available';
      bedToUpdate.patient = null;
      updatedBeds[department].occupied -= 1;
      setBeds(updatedBeds);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bed Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => setOpen(true)}
          disabled={!selectedBed}
        >
          Assign Bed
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalHospital sx={{ mr: 1 }} /> Total Beds
              </Typography>
              <Typography variant="h3">{beds.total}</Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Chip 
                  label={`Available: ${beds.available}`}
                  color="success"
                  size="small"
                />
                <Chip 
                  label={`Occupied: ${beds.occupied}`}
                  color="error"
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {['icu', 'general', 'emergency'].map((dept) => (
          <Grid item xs={12} md={4} key={dept}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
                  {dept} Beds
                </Typography>
                <Typography variant="h3">{beds[dept].total}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Chip 
                    label={`Available: ${beds[dept].total - beds[dept].occupied}`}
                    color="success"
                    size="small"
                  />
                  <Chip 
                    label={`Occupied: ${beds[dept].occupied}`}
                    color="error"
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {['icu', 'general', 'emergency'].map((dept) => (
        <Box sx={{ mt: 4 }} key={dept}>
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'uppercase' }}>
            {dept} Ward Status
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Bed ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Admission Date</TableCell>
                  <TableCell>Expected Discharge</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beds[dept].beds.map((bed) => (
                  <TableRow key={bed.id}>
                    <TableCell>{bed.id}</TableCell>
                    <TableCell>
                      <Chip
                        label={bed.status}
                        color={bed.status === 'available' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{bed.patient?.name || '-'}</TableCell>
                    <TableCell>{bed.patient?.admissionDate || '-'}</TableCell>
                    <TableCell>{bed.patient?.expectedDischarge || '-'}</TableCell>
                    <TableCell>
                      {bed.status === 'available' ? (
                        <Tooltip title="Select for assignment">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setSelectedBed(bed.id);
                              setNewPatient({...newPatient, department: dept});
                              setOpen(true);
                            }}
                          >
                            <PersonAdd />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Discharge patient">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDischargeBed(dept, bed.id)}
                          >
                            <Clear />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign Bed {selectedBed}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admission Date"
                type="date"
                value={newPatient.admissionDate}
                onChange={(e) => setNewPatient({...newPatient, admissionDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expected Discharge"
                type="date"
                value={newPatient.expectedDischarge}
                onChange={(e) => setNewPatient({...newPatient, expectedDischarge: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAssignBed}
            variant="contained"
            color="primary"
            disabled={!newPatient.name || !newPatient.expectedDischarge}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BedManagement;
