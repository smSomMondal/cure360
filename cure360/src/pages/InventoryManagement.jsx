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
  Alert,
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
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import { Add, Edit, Delete, Refresh, Warning, Inventory } from '@mui/icons-material';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Medicine',
      quantity: 1000,
      unit: 'tablets',
      reorderPoint: 200,
      expiryDate: '2025-12-31',
      batchNumber: 'BAT001',
      supplier: 'MedPharm Inc',
      lastUpdated: '2025-04-20',
      cost: 0.05,
      location: 'Pharmacy Store A'
    },
    {
      id: 2,
      name: 'Surgical Masks',
      category: 'Consumables',
      quantity: 500,
      unit: 'pieces',
      reorderPoint: 100,
      expiryDate: '2026-06-30',
      batchNumber: 'BAT002',
      supplier: 'MedSupplies Ltd',
      lastUpdated: '2025-04-15',
      cost: 0.50,
      location: 'Medical Store B'
    },
    {
      id: 3,
      name: 'Insulin',
      category: 'Medicine',
      quantity: 50,
      unit: 'vials',
      reorderPoint: 20,
      expiryDate: '2025-08-15',
      batchNumber: 'BAT003',
      supplier: 'MedPharm Inc',
      lastUpdated: '2025-04-10',
      cost: 15.00,
      location: 'Cold Storage'
    },
    {
      id: 4,
      name: 'Surgical Gloves',
      category: 'Consumables',
      quantity: 80,
      unit: 'pairs',
      reorderPoint: 100,
      expiryDate: '2026-01-20',
      batchNumber: 'BAT004',
      supplier: 'MedSupplies Ltd',
      lastUpdated: '2025-04-05',
      cost: 0.75,
      location: 'Medical Store A'
    },
  ]);
  
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    category: '',
    quantity: '',
    unit: '',
    reorderPoint: '',
    expiryDate: '',
    batchNumber: '',
    supplier: '',
    cost: '',
    location: ''
  });
  
  const categories = ['Medicine', 'Consumables', 'Equipment', 'Laboratory', 'Surgical'];
  const units = ['tablets', 'pieces', 'vials', 'bottles', 'boxes', 'pairs', 'ml', 'liters', 'grams', 'kits'];
  const locations = ['Pharmacy Store A', 'Pharmacy Store B', 'Medical Store A', 'Medical Store B', 'Cold Storage', 'Emergency Stock'];
  
  const handleAddItem = () => {
    setEditMode(false);
    setCurrentItem({
      id: null,
      name: '',
      category: '',
      quantity: '',
      unit: '',
      reorderPoint: '',
      expiryDate: '',
      batchNumber: '',
      supplier: '',
      cost: '',
      location: ''
    });
    setOpen(true);
  };
  
  const handleEditItem = (item) => {
    setEditMode(true);
    setCurrentItem({...item});
    setOpen(true);
  };
  
  const handleSaveItem = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (editMode) {
      setInventory(inventory.map(item => 
        item.id === currentItem.id ? {...currentItem, lastUpdated: today} : item
      ));
    } else {
      const newId = Math.max(...inventory.map(item => item.id), 0) + 1;
      setInventory([...inventory, {...currentItem, id: newId, lastUpdated: today}]);
    }
    
    setOpen(false);
  };
  
  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };
  
  const handleReorder = (id) => {
    const item = inventory.find(item => item.id === id);
    setInventory(inventory.map(invItem => 
      invItem.id === id ? {...invItem, quantity: invItem.quantity + invItem.reorderPoint} : invItem
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddItem}
        >
          Add New Item
        </Button>
      </Box>

      {inventory.some(item => item.quantity <= item.reorderPoint) && (
        <Alert severity="warning" sx={{ mb: 2 }} icon={<Warning />}>
          <Typography variant="body1" fontWeight="bold">
            Inventory Alert: {inventory.filter(item => item.quantity <= item.reorderPoint).length} items are running low and need to be reordered
          </Typography>
        </Alert>
      )}
      
      {inventory.some(item => new Date(item.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3))) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Expiry Alert: {inventory.filter(item => new Date(item.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3))).length} items are expiring within 3 months
          </Typography>
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Reorder Point</TableCell>
              <TableCell>Batch #</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => {
              const isLowStock = item.quantity <= item.reorderPoint;
              const isNearExpiry = new Date(item.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3));
              
              return (
                <TableRow 
                  key={item.id}
                  sx={{ 
                    backgroundColor: 
                      isNearExpiry ? '#ffebee' : 
                      isLowStock ? '#fff3e0' : 'inherit'
                  }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Chip label={item.category} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography 
                      color={isLowStock ? 'error' : 'inherit'}
                      fontWeight={isLowStock ? 'bold' : 'normal'}
                    >
                      {item.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>{item.batchNumber}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <Typography 
                      color={isNearExpiry ? 'error' : 'inherit'}
                      fontWeight={isNearExpiry ? 'bold' : 'normal'}
                    >
                      {item.expiryDate}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Edit Item">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditItem(item)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Delete Item">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      
                      {isLowStock && (
                        <Tooltip title="Reorder Item">
                          <IconButton 
                            size="small" 
                            color="warning"
                            onClick={() => handleReorder(item.id)}
                          >
                            <Refresh fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Item Name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentItem.category}
                  label="Category"
                  onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                >
                  {categories.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={currentItem.quantity}
                onChange={(e) => setCurrentItem({...currentItem, quantity: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select
                  value={currentItem.unit}
                  label="Unit"
                  onChange={(e) => setCurrentItem({...currentItem, unit: e.target.value})}
                >
                  {units.map(unit => (
                    <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Reorder Point"
                type="number"
                value={currentItem.reorderPoint}
                onChange={(e) => setCurrentItem({...currentItem, reorderPoint: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Batch Number"
                value={currentItem.batchNumber}
                onChange={(e) => setCurrentItem({...currentItem, batchNumber: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Supplier"
                value={currentItem.supplier}
                onChange={(e) => setCurrentItem({...currentItem, supplier: e.target.value})}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                value={currentItem.expiryDate}
                onChange={(e) => setCurrentItem({...currentItem, expiryDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Cost per Unit"
                type="number"
                value={currentItem.cost}
                onChange={(e) => setCurrentItem({...currentItem, cost: e.target.value})}
                InputProps={{ startAdornment: '₹' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Storage Location</InputLabel>
                <Select
                  value={currentItem.location}
                  label="Storage Location"
                  onChange={(e) => setCurrentItem({...currentItem, location: e.target.value})}
                >
                  {locations.map(loc => (
                    <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveItem} 
            variant="contained" 
            color="primary"
            disabled={!currentItem.name || !currentItem.category || !currentItem.quantity}
          >
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement;
