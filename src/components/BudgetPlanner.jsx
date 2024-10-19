import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetPlanner.css';

const BudgetPlanner = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: '', amount: '', paid: '' });
  const [totalBudget, setTotalBudget] = useState(0);
  const [editPaidId, setEditPaidId] = useState(null);
  const [editPaidValue, setEditPaidValue] = useState('');

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
  }, [userId]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('https://wedding-planner-2.onrender.com/budgets', {
        headers: { 'x-user-id': userId },
      });
      setBudgets(response.data);
      calculateTotalBudget(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const calculateTotalBudget = (budgets) => {
    const total = budgets.reduce((acc, budget) => acc + parseFloat(budget.amount), 0);
    setTotalBudget(total);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({ ...newBudget, [name]: value });
  };

  const addBudget = async () => {
    if (!userId) {
      alert('Unauthorized user');
      return;
    }
    try {
      const response = await axios.post('https://wedding-planner-2.onrender.com/budgets', newBudget, {
        headers: { 'x-user-id': userId },
      });
      const updatedBudgets = [...budgets, response.data];
      setBudgets(updatedBudgets);
      setNewBudget({ category: '', amount: '', paid: '' });
      calculateTotalBudget(updatedBudgets);
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const handleEditPaid = (id, currentPaid) => {
    setEditPaidId(id);
    setEditPaidValue(currentPaid);
  };

  const savePaidAmount = async (id) => {
    if (!userId) {
      alert('Unauthorized user');
      return;
    }
    try {
      const response = await axios.put(`https://wedding-planner-2.onrender.com/budgets/${id}`, { paid: editPaidValue }, {
        headers: { 'x-user-id': userId },
      });
      const updatedBudgets = budgets.map((budget) =>
        budget._id === id ? { ...budget, paid: response.data.paid } : budget
      );
      setBudgets(updatedBudgets);
      setEditPaidId(null);
      setEditPaidValue('');
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const deleteBudget = async (id) => {
    if (!userId) {
      alert('Unauthorized user');
      return;
    }
    try {
      await axios.delete(`https://wedding-planner-2.onrender.com/budgets/${id}`, {
        headers: { 'x-user-id': userId },
      });
      const updatedBudgets = budgets.filter(budget => budget._id !== id);
      setBudgets(updatedBudgets);
      calculateTotalBudget(updatedBudgets);
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  return (
    <div className="container">
      <h1>Wedding Budget Planner</h1>
      <h2 style={{color:'white'}}>Total Budget: ${totalBudget}</h2>

      <div className="form">
        <input
          type="text"
          name="category"
          value={newBudget.category}
          onChange={handleChange}
          placeholder="Budget Category"
        />
        <input
          type="number"
          name="amount"
          value={newBudget.amount}
          onChange={handleChange}
          placeholder="Amount"
        />
        <input
          type="number"
          name="paid"
          value={newBudget.paid}
          onChange={handleChange}
          placeholder="Amount Paid"
        />
        <button onClick={addBudget}>Add Budget</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount</th>
            <th>Amount Paid</th>
            <th>Balance</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(budget => {
            const balance = budget.amount - budget.paid;
            const paymentStatus = balance === 0 ? 'Paid' : 'Pending';

            return (
              <tr key={budget._id}>
                <td>{budget.category}</td>
                <td>${budget.amount}</td>
                <td>
                  {editPaidId === budget._id ? (
                    <>
                      <input
                        type="number"
                        value={editPaidValue}
                        onChange={(e) => setEditPaidValue(e.target.value)}
                      />
                      <button onClick={() => savePaidAmount(budget._id)}>Save</button>
                    </>
                  ) : (
                    <>
                      ${budget.paid}{' '}
                      <button onClick={() => handleEditPaid(budget._id, budget.paid)}>Edit</button>
                    </>
                  )}
                </td>
                <td>${balance}</td>
                <td>{paymentStatus}</td>
                <td>
                  <button onClick={() => deleteBudget(budget._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetPlanner;
