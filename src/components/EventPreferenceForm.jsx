// src/EventPreferenceForm.js
import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedData = [...submittedData];
      updatedData[editIndex] = formData;
      setSubmittedData(updatedData);
      setEditIndex(null);
    } else {
      setSubmittedData([...submittedData, formData]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
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

      {submittedData.length > 0 && (
        <div className="submitted-data">
          <h2>Your Event Preferences:</h2>
          {submittedData.map((data, index) => (
            <div key={index} className="event-entry">
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
