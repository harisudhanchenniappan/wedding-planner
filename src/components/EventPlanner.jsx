import React, { useState } from 'react';
import './EventPlanner.css'

const EventPlanner = () => {
    const [events, setEvents] = useState([
      { id: 1, name: 'Ceremony', time: '2024-05-20 15:00' },
      { id: 2, name: 'Reception', time: '2024-05-20 18:00' },
      { id: 3, name: 'Photoshoot', time: '2024-05-20 17:00' },
    ]);
    
    const [newEvent, setNewEvent] = useState({ name: '', time: '' });
    const [editMode, setEditMode] = useState({ isEditing: false, eventId: null });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewEvent({ ...newEvent, [name]: value });
    };
  
    const addEvent = () => {
      if (newEvent.name && newEvent.time) {
        setEvents([...events, { id: Date.now(), ...newEvent }]);
        setNewEvent({ name: '', time: '' });
      }
    };
  
    const deleteEvent = (id) => {
      setEvents(events.filter(event => event.id !== id));
    };
  
    const editEvent = (id) => {
      const eventToEdit = events.find(event => event.id === id);
      setNewEvent(eventToEdit);
      setEditMode({ isEditing: true, eventId: id });
    };
  
    const updateEvent = () => {
      setEvents(events.map(event => (event.id === editMode.eventId ? newEvent : event)));
      setNewEvent({ name: '', time: '' });
      setEditMode({ isEditing: false, eventId: null });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      editMode.isEditing ? updateEvent() : addEvent();
    };
  
    const sortEvents = () => {
      setEvents([...events].sort((a, b) => new Date(a.time) - new Date(b.time)));
    };
  
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Wedding Event Planner</h1>
        <h2>Registered Events</h2>
        <button onClick={sortEvents} style={{ marginBottom: '20px' }}>Sort by Time</button>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
            placeholder="Event Name"
            required
            style={{ marginRight: '10px' }}
          />
          <input
            type="datetime-local"
            name="time"
            value={newEvent.time}
            onChange={handleChange}
            required
            style={{ marginRight: '10px' }}
          />
          <button type="submit">{editMode.isEditing ? 'Update Event' : 'Add Event'}</button>
        </form>
        <table style={{ margin: '0 auto', border: '1px solid #ccc', width: '50%' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px' }}>Event Name</th>
              <th style={{ padding: '10px' }}>Scheduled Time</th>
              <th style={{ padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td style={{ padding: '10px' }}>{event.name}</td>
                <td style={{ padding: '10px' }}>{event.time}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => editEvent(event.id)}>Edit</button>
                  <button onClick={() => deleteEvent(event.id)} style={{ marginLeft: '10px' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EventPlanner;
