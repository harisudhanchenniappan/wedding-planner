import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventPlanner.css';

const EventPlanner = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', time: '' });
  const [editMode, setEditMode] = useState({ isEditing: false, eventId: null });

  useEffect(() => {
    const userId = localStorage.getItem('id'); 
    if (userId) {
      fetchEvents(userId);
    }
  }, []);

  const fetchEvents = async (userId) => {
    try {
      const response = await axios.get(`https://wedding-planner-2.onrender.com/events?userId=${userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = async () => {
    const userId = localStorage.getItem('id');
    if (newEvent.name && newEvent.time) {
      try {
        const response = await axios.post('https://wedding-planner-2.onrender.com/events', { ...newEvent, userId });
        setEvents([...events, response.data]);
        setNewEvent({ name: '', time: '' });
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`https://wedding-planner-2.onrender.com/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const editEvent = (id) => {
    const eventToEdit = events.find(event => event._id === id);
    setNewEvent({ name: eventToEdit.name, time: eventToEdit.time });
    setEditMode({ isEditing: true, eventId: id });
  };

  const updateEvent = async () => {
    try {
      const response = await axios.put(`https://wedding-planner-2.onrender.com/events/${editMode.eventId}`, { ...newEvent });
      setEvents(events.map(event => (event._id === editMode.eventId ? response.data : event)));
      setNewEvent({ name: '', time: '' });
      setEditMode({ isEditing: false, eventId: null });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMode.isEditing ? updateEvent() : addEvent();
  };

  const sortEvents = () => {
    setEvents([...events].sort((a, b) => new Date(a.time) - new Date(b.time)));
  };

  return (
    <div className="container">
  <h1>Wedding Event Planner</h1>
  

  <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
    <input
      type="text"
      name="name"
      value={newEvent.name}
      onChange={handleChange}
      placeholder="Event Name"
      required
    />
    <input
      type="datetime-local"
      name="time"
      value={newEvent.time}
      onChange={handleChange}
      required
    />
    <button type="submit">{editMode.isEditing ? 'Update Event' : 'Add Event'}</button>
  </form>

  
  <h2 style={{color:'white'}}>Registered Events</h2>
  <table>
    <thead>
      <tr>
        <th>Event Name</th>
        <th>Scheduled Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {events.map(event => (
        <tr key={event._id}>
          <td>{event.name}</td>
          <td>{new Date(event.time).toLocaleString()}</td>
          <td>
            <button onClick={() => editEvent(event._id)}>Edit</button>
            <button onClick={() => deleteEvent(event._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button onClick={sortEvents} className="sort-button">Sort by Time</button>
</div>
  );
};

export default EventPlanner;
