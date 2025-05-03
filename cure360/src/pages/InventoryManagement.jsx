import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InventoryManagement.css'; // You'll need to create this CSS file separately

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
  
  const [dialogOpen, setDialogOpen] = useState(false);
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
    setDialogOpen(true);
  };
  
  const handleEditItem = (item) => {
    setEditMode(true);
    setCurrentItem({...item});
    setDialogOpen(true);
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
    
    setDialogOpen(false);
  };
  
  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };
  
  const handleReorder = (id) => {
    const item = inventory.find(item => item.id === id);
    setInventory(inventory.map(invItem => 
      invItem.id === id ? {...invItem, quantity: parseInt(invItem.quantity) + parseInt(invItem.reorderPoint)} : invItem
    ));
  };

  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderPoint);
  const expiringItems = inventory.filter(item => 
    new Date(item.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3))
  );


  const navigate = useNavigate();
  return (
    <div className="inventory-container">
      <div className="header-section">
      <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl font-bold">Queue Management</h1>
        </div>
        <h1>Inventory Management</h1>
        <button className="add-button" onClick={handleAddItem}>
          + Add New Item
        </button>
      </div>

      {lowStockItems.length > 0 && (
        <div className="alert warning">
          <strong>Inventory Alert:</strong> {lowStockItems.length} items are running low and need to be reordered
        </div>
      )}
      
      {expiringItems.length > 0 && (
        <div className="alert error">
          <strong>Expiry Alert:</strong> {expiringItems.length} items are expiring within 3 months
        </div>
      )}

      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Reorder Point</th>
              <th>Batch #</th>
              <th>Supplier</th>
              <th>Expiry Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const isLowStock = item.quantity <= item.reorderPoint;
              const isNearExpiry = new Date(item.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3));
              
              return (
                <tr 
                  key={item.id}
                  className={`
                    ${isNearExpiry ? 'near-expiry' : ''} 
                    ${isLowStock ? 'low-stock' : ''}
                  `}
                >
                  <td>{item.name}</td>
                  <td>
                    <span className="category-chip">{item.category}</span>
                  </td>
                  <td className={isLowStock ? 'quantity-low' : ''}>
                    {item.quantity}
                  </td>
                  <td>{item.unit}</td>
                  <td>{item.reorderPoint}</td>
                  <td>{item.batchNumber}</td>
                  <td>{item.supplier}</td>
                  <td className={isNearExpiry ? 'date-expiring' : ''}>
                    {item.expiryDate}
                  </td>
                  <td>{item.location}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="icon-button edit-button" 
                        title="Edit Item"
                        onClick={() => handleEditItem(item)}
                      >
                        ✏
                      </button>
                      
                      <button 
                        className="icon-button delete-button" 
                        title="Delete Item"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        🗑
                      </button>
                      
                      {isLowStock && (
                        <button 
                          className="icon-button reorder-button" 
                          title="Reorder Item"
                          onClick={() => handleReorder(item.id)}
                        >
                          🔄
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {dialogOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editMode ? 'Edit Inventory Item' : 'Add New Inventory Item'}</h2>
              <button className="close-button" onClick={() => setDialogOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="itemName">Item Name</label>
                  <input
                    id="itemName"
                    type="text"
                    value={currentItem.name}
                    onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={currentItem.category}
                    onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    id="quantity"
                    type="number"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({...currentItem, quantity: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="unit">Unit</label>
                  <select
                    id="unit"
                    value={currentItem.unit}
                    onChange={(e) => setCurrentItem({...currentItem, unit: e.target.value})}
                  >
                    <option value="">Select Unit</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="reorderPoint">Reorder Point</label>
                  <input
                    id="reorderPoint"
                    type="number"
                    value={currentItem.reorderPoint}
                    onChange={(e) => setCurrentItem({...currentItem, reorderPoint: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="batchNumber">Batch Number</label>
                  <input
                    id="batchNumber"
                    type="text"
                    value={currentItem.batchNumber}
                    onChange={(e) => setCurrentItem({...currentItem, batchNumber: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="supplier">Supplier</label>
                  <input
                    id="supplier"
                    type="text"
                    value={currentItem.supplier}
                    onChange={(e) => setCurrentItem({...currentItem, supplier: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    id="expiryDate"
                    type="date"
                    value={currentItem.expiryDate}
                    onChange={(e) => setCurrentItem({...currentItem, expiryDate: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cost">Cost per Unit</label>
                  <div className="cost-input-container">
                    <span className="currency-symbol">₹</span>
                    <input
                      id="cost"
                      type="number"
                      value={currentItem.cost}
                      onChange={(e) => setCurrentItem({...currentItem, cost: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Storage Location</label>
                  <select
                    id="location"
                    value={currentItem.location}
                    onChange={(e) => setCurrentItem({...currentItem, location: e.target.value})}
                  >
                    <option value="">Select Location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button" 
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="save-button" 
                onClick={handleSaveItem}
                disabled={!currentItem.name || !currentItem.category || !currentItem.quantity}
              >
                {editMode ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;