// src/BudgetPlanner.js
import React, { useState } from 'react';

const defaultExpenses = [
  { name: 'Hall', cost: 0 },
  { name: 'Caterer', cost: 0 },
  { name: 'Photographer', cost: 0 },
  { name: 'Decorator', cost: 0 },
  { name: 'Music', cost: 0 },
  
];

const BudgetPlanner = () => {
  const [items, setItems] = useState(defaultExpenses);
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [initialBudget, setInitialBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  const calculateTotalExpenses = () => {
    return items.reduce((total, item) => total + item.cost, 0);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName || !itemCost) return;

    const newItem = {
      name: itemName,
      cost: parseFloat(itemCost) || 0,  // Ensure cost is a number
      amountPaid: 0,
    };

    if (editingIndex !== null) {
      const updatedItems = items.map((item, index) =>
        index === editingIndex ? { ...item, name: newItem.name, cost: newItem.cost } : item
      );
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems((prevItems) => [...prevItems, newItem]);
    }

    resetForm();
    updateTotalExpenses();
  };

  const updateTotalExpenses = () => {
    const total = calculateTotalExpenses();
    setTotalExpenses(total);
  };

  const handleBudgetUpdate = () => {
    const budget = parseFloat(prompt("Enter the initial wedding budget:"));
    if (!isNaN(budget)) {
      setInitialBudget(budget);
    }
  };

  const handleEditItem = (index) => {
    const itemToEdit = items[index];
    setItemName(itemToEdit.name);
    setItemCost(itemToEdit.cost);
    setEditingIndex(index);
  };

  const handleDeleteItem = (index) => {
    if (index < defaultExpenses.length) return; // Prevent deletion of default expenses

    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    updateTotalExpenses();
  };

  const handleAmountPaidUpdate = (index) => {
    const amount = parseFloat(prompt("Enter amount paid for " + items[index].name));
    if (!isNaN(amount)) {
      const updatedItems = items.map((item, i) =>
        i === index ? { ...item, amountPaid: amount } : item
      );
      setItems(updatedItems);
      updateTotalExpenses();
    }
  };

  const resetForm = () => {
    setItemName('');
    setItemCost('');
  };

  return (
    <div>
      <h1>Wedding Budget Planner</h1>
      <h3>Initial Budget: {initialBudget.toFixed(2)}</h3>
      <button onClick={handleBudgetUpdate}>Update Initial Budget</button>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Item Cost"
          value={itemCost}
          onChange={(e) => setItemCost(e.target.value)}
        />
        <button type="submit">{editingIndex !== null ? 'Update Item' : 'Add Item'}</button>
      </form>

      <h2>Budget Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Cost</th>
            <th>Edit</th>
            <th>Amount Paid</th>
            <th>Balance Amount</th>
            <th>Payment Status</th>            
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const balanceAmount = item.cost - (item.amountPaid || 0);
            const paymentStatus = balanceAmount === item.cost ? 'Not Paid' :
                                  balanceAmount === 0 ? 'Payment Complete' : 'Partially Paid';

            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.cost.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEditItem(index)}>Edit</button>
                </td>
                <td>
                  <span>{(item.amountPaid || 0).toFixed(2)}</span>
                  <button onClick={() => handleAmountPaidUpdate(index)}>Update</button>
                </td>
                <td>{balanceAmount.toFixed(2)}</td>
                <td>{paymentStatus}</td>
               
                <td>
                  {index >= defaultExpenses.length && (
                    <button onClick={() => handleDeleteItem(index)}>Delete</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

     
      <h3>Total Expenses: {totalExpenses.toFixed(2)}</h3>
      <h3>Available Budget: {(initialBudget - totalExpenses).toFixed(2)}</h3>
    </div>
  );
};

export default BudgetPlanner;
