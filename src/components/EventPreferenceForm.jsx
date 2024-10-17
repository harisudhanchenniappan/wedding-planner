
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventPreferenceForm.css';

const EventPreferenceForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    location: '',
    theme: '',
    additionalNotes: '',
  });

  const [submittedData, setSubmittedData] = useState([]); 
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('id');
      try {
        const response = await axios.get(`https://wedding-planner-2.onrender.com/api/event-preferences/${userId}`);
       
        setSubmittedData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('id');
    if (!userId) {
      alert('Please log in to submit the form.');
      return;
    }
    try {
      if (editIndex !== null) {
        const updatedData = await axios.put(`https://wedding-planner-2.onrender.com/api/event-preferences/${submittedData[editIndex]._id}`, { ...formData, userId });
        const newSubmittedData = [...submittedData];
        newSubmittedData[editIndex] = updatedData.data;
        setSubmittedData(newSubmittedData);
        setEditIndex(null);
      } else {
        const response = await axios.post('https://wedding-planner-2.onrender.com/api/event-preferences', { ...formData, userId });
        setSubmittedData([...submittedData, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const entryId = submittedData[index]._id;
    try {
      await axios.delete(`https://wedding-planner-2.onrender.com/api/event-preferences/${entryId}`);
      const updatedData = submittedData.filter((_, i) => i !== index);
      setSubmittedData(updatedData);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      eventName: '',
      date: '',
      location: '',
      theme: '',
      additionalNotes: '',
    });
  };

  return (
    <div className="event-preference-form">
      <h1>Event Preference Form</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Theme:
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
          />
        </label>
        <label>
          Additional Notes:
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
          />
        </label>
        <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
      </form>

      {Array.isArray(submittedData) && submittedData.length > 0 && ( 
        <div className="submitted-data">
          <h2>Your Event Preferences:</h2>
          {submittedData.map((data, index) => (
            <div key={data._id} className="event-entry">
              <p><strong>Event Name:</strong> {data.eventName}</p>
              <p><strong>Date:</strong> {data.date}</p>
              <p><strong>Location:</strong> {data.location}</p>
              <p><strong>Theme:</strong> {data.theme}</p>
              <p><strong>Additional Notes:</strong> {data.additionalNotes}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPreferenceForm;
