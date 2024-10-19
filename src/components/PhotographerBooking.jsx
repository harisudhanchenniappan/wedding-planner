import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhotographerBooking.css';

const photographersData = [
  { id: 1, name: 'Photographer A', budget: 500, contact: '123-456-7890', videoCost: 150, droneCost: 200 },
  { id: 2, name: 'Photographer B', budget: 600, contact: '987-654-3210', videoCost: 200, droneCost: 250 },
  { id: 3, name: 'Photographer C', budget: 450, contact: '555-555-5555', videoCost: 100, droneCost: 150 },
  { id: 4, name: 'Photographer D', budget: 700, contact: '444-444-4444', videoCost: 200, droneCost: 300 },
  { id: 5, name: 'Photographer E', budget: 800, contact: '333-333-3333', videoCost: 250, droneCost: 350 },
 
];

const PhotographerBooking = () => {
  const [photographers, setPhotographers] = useState(photographersData);
  const [selectedPhotographers, setSelectedPhotographers] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [bookedPhotographers, setBookedPhotographers] = useState([]);

  useEffect(() => {
    const fetchBookedPhotographers = async () => {
      const userId = localStorage.getItem('id');
      if (!userId) {
        alert('User is not logged in.');
        return;
      }
      try {
        const response = await axios.get(`https://wedding-planner-2.onrender.com/photographer-bookings/${userId}`);
        setBookedPhotographers(response.data);
      } catch (error) {
        console.error('Error fetching booked photographers:', error);
      }
    };
    fetchBookedPhotographers();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`https://wedding-planner-2.onrender.com/photographer-bookings/${bookingId}`);
      setBookedPhotographers(bookedPhotographers.filter((booking) => booking._id !== bookingId));
      setSelectedPhotographers(selectedPhotographers.filter((id) => id !== bookingId));
      alert(response.data.message);
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert(error.response ? error.response.data.error : 'An error occurred while canceling the booking.');
    }
  };

  const handleSelectPhotographer = async (photographer) => {
    const booking = bookedPhotographers.find((b) => b.photographerId === photographer.id);

    if (booking) {
      const confirmed = window.confirm(`Are you sure you want to cancel booking for ${photographer.name}?`);
      if (confirmed) {
        await cancelBooking(booking._id);
      }
    } else {
      const confirmBooking = window.confirm(`Confirm booking for ${photographer.name}?`);
      if (confirmBooking) {
        await bookPhotographer(photographer);
      }
    }
  };

  const bookPhotographer = async (photographer) => {
    const userId = localStorage.getItem('id');
    const videoSelected = photographer.selectedVideo || false;
    const droneSelected = photographer.selectedDrone || false;

    try {
      const response = await axios.post('https://wedding-planner-2.onrender.com/photographer-bookings', {
        userId,
        photographerId: photographer.id,
        photographerName: photographer.name,
        budget: photographer.budget,
        videoSelected,
        droneSelected,
        contactNumber: photographer.contact,
      });
      setBookedPhotographers([...bookedPhotographers, response.data.booking]);
      setSelectedPhotographers([...selectedPhotographers, photographer.id]);
    } catch (error) {
      console.error('Error booking photographer:', error);
      alert(error.response ? error.response.data.error : 'An error occurred while booking the photographer.');
    }
  };

  const handleCheckboxChange = (photographerId, type) => {
    const updatedPhotographers = photographers.map((photographer) => {
      if (photographer.id === photographerId) {
        if (type === 'video') {
          photographer.selectedVideo = !photographer.selectedVideo;
        } else if (type === 'drone') {
          photographer.selectedDrone = !photographer.selectedDrone;
        }
      }
      return photographer;
    });
    setPhotographers(updatedPhotographers);
  };

  const filteredPhotographers = photographers.filter((photographer) => {
    const budget = photographer.budget;
    const min = parseFloat(minBudget) || 0;
    const max = parseFloat(maxBudget) || Infinity;
    return budget >= min && budget <= max;
  });

  return (
    <div style={{backgroundColor:'white'}}>
      <h1>Photographer Booking</h1>

      <div>
        <label htmlFor="filter">Filter by Price</label>
        <input
          type="number"
          placeholder="Min Budget"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
          name='filter'
        />
        <input
          type="number"
          placeholder="Max Budget"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />
      </div>

      <h2 style={{color:'white'}}>Booked Photographers:</h2>
      <div className="photographer-cards">
        {bookedPhotographers.map((photographer) => {
          const additionalCost =
            (photographer.selectedVideo ? photographer.videoCost : 0) +
            (photographer.selectedDrone ? photographer.droneCost : 0);
          const totalCost = photographer.budget + additionalCost;

          return (
            <div key={photographer._id}  style={{ border: '2px solid green' }} className="card booked-card">
              <h3>{photographer.photographerName}</h3>
              <p>Min-Budget: ${photographer.budget}</p>
              <p>Contact: {photographer.contactNumber}</p>
              {photographer.videoSelected && <p>Video included</p>}
              {photographer.droneSelected && <p>Drone included</p>}
              <button className="cancel" onClick={() => cancelBooking(photographer._id)}>
                Cancel Booking
              </button>
            </div>
          );
        })}
      </div>

      <h2 style={{color:'white'}}>Available Photographers:</h2>
      <div className="photographer-cards">
        {filteredPhotographers.map((photographer) => {
          const additionalCost =
            (photographer.selectedVideo ? photographer.videoCost : 0) +
            (photographer.selectedDrone ? photographer.droneCost : 0);
          const totalCost = photographer.budget + additionalCost;

          return (
            <div key={photographer.id} className="card">
              <h3>{photographer.name}</h3>
              <p>Min-Budget: ${photographer.budget}</p>
              <p>Contact: {photographer.contact}</p>
              <p>Total Budget: ${totalCost}</p>

              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={photographer.selectedVideo}
                    onChange={() => handleCheckboxChange(photographer.id, 'video')}
                  />
                  Video (+${photographer.videoCost})
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={photographer.selectedDrone}
                    onChange={() => handleCheckboxChange(photographer.id, 'drone')}
                  />
                  Drone (+${photographer.droneCost})
                </label>
              </div>
              <button onClick={() => handleSelectPhotographer(photographer)}>Book</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotographerBooking;
