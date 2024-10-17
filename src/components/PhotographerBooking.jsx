// src/PhotographerBooking.js
import React, { useState } from 'react';

// Sample data for photographers (total of 20 photographers)
const photographersData = [
  { id: 1, name: 'Photographer A', budget: 500, contact: '123-456-7890', videoCost: 150, droneCost: 200 },
  { id: 2, name: 'Photographer B', budget: 600, contact: '987-654-3210', videoCost: 200, droneCost: 250 },
  { id: 3, name: 'Photographer C', budget: 450, contact: '555-555-5555', videoCost: 100, droneCost: 150 },
  { id: 4, name: 'Photographer D', budget: 700, contact: '444-444-4444', videoCost: 200, droneCost: 300 },
  { id: 5, name: 'Photographer E', budget: 800, contact: '333-333-3333', videoCost: 250, droneCost: 350 },
  { id: 6, name: 'Photographer F', budget: 550, contact: '222-222-2222', videoCost: 100, droneCost: 200 },
  { id: 7, name: 'Photographer G', budget: 900, contact: '111-111-1111', videoCost: 300, droneCost: 400 },
  { id: 8, name: 'Photographer H', budget: 650, contact: '666-666-6666', videoCost: 200, droneCost: 250 },
  { id: 9, name: 'Photographer I', budget: 500, contact: '777-777-7777', videoCost: 150, droneCost: 150 },
  { id: 10, name: 'Photographer J', budget: 750, contact: '888-888-8888', videoCost: 250, droneCost: 300 },
  { id: 11, name: 'Photographer K', budget: 400, contact: '999-999-9999', videoCost: 100, droneCost: 150 },
  { id: 12, name: 'Photographer L', budget: 850, contact: '000-000-0000', videoCost: 250, droneCost: 350 },
  { id: 13, name: 'Photographer M', budget: 600, contact: '321-654-9870', videoCost: 150, droneCost: 200 },
  { id: 14, name: 'Photographer N', budget: 720, contact: '654-321-0123', videoCost: 200, droneCost: 250 },
  { id: 15, name: 'Photographer O', budget: 500, contact: '456-789-1234', videoCost: 100, droneCost: 150 },
  { id: 16, name: 'Photographer P', budget: 900, contact: '789-123-4567', videoCost: 300, droneCost: 400 },
  { id: 17, name: 'Photographer Q', budget: 650, contact: '234-567-8901', videoCost: 200, droneCost: 250 },
  { id: 18, name: 'Photographer R', budget: 450, contact: '345-678-9012', videoCost: 150, droneCost: 150 },
  { id: 19, name: 'Photographer S', budget: 800, contact: '567-890-1234', videoCost: 250, droneCost: 350 },
  { id: 20, name: 'Photographer T', budget: 700, contact: '678-901-2345', videoCost: 200, droneCost: 300 },
];

const PhotographerBooking = () => {
  const [photographers, setPhotographers] = useState(photographersData);
  const [selectedPhotographers, setSelectedPhotographers] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const handleSelectPhotographer = (photographer) => {
    if (selectedPhotographers.includes(photographer.id)) {
      setSelectedPhotographers(selectedPhotographers.filter(id => id !== photographer.id));
    } else {
      const confirmBooking = window.confirm(`Confirm booking for ${photographer.name}?`);
      if (confirmBooking) {
        setSelectedPhotographers([...selectedPhotographers, photographer.id]);
      }
    }
  };

  const handleCheckboxChange = (photographerId, type) => {
    const updatedPhotographers = photographers.map(photographer => {
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

  const filteredPhotographers = photographers.filter(photographer => {
    const budget = photographer.budget;
    const min = parseFloat(minBudget) || 0;
    const max = parseFloat(maxBudget) || Infinity;
    return budget >= min && budget <= max;
  });

  const bookedPhotographers = filteredPhotographers.filter(photographer => 
    selectedPhotographers.includes(photographer.id)
  );

  const unbookedPhotographers = filteredPhotographers.filter(photographer => 
    !selectedPhotographers.includes(photographer.id)
  );

  return (
    <div>
      <h1>Photographer Booking</h1>

      <div>
        <input 
          type="number" 
          placeholder="Min Budget" 
          value={minBudget} 
          onChange={(e) => setMinBudget(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Max Budget" 
          value={maxBudget} 
          onChange={(e) => setMaxBudget(e.target.value)} 
        />
      </div>

      <h2>Booked Photographers:</h2>
      <div className="photographer-cards">
        {bookedPhotographers.map((photographer) => {
          const additionalCost = (photographer.selectedVideo ? photographer.videoCost : 0) +
                                 (photographer.selectedDrone ? photographer.droneCost : 0);
          const totalCost = photographer.budget + additionalCost;

          return (
            <div key={photographer.id} className="card" style={{ border: '2px solid green' }}>
              <h3>{photographer.name}</h3>
              <p>Budget: ${photographer.budget}</p>
              <p>Contact: {photographer.contact}</p>
              <p>Total Cost: ${totalCost}</p>

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
              <button onClick={() => handleSelectPhotographer(photographer)}>
                Deselect
              </button>
            </div>
          );
        })}
      </div>

      <h2>Available Photographers:</h2>
      <div className="photographer-cards">
        {unbookedPhotographers.map((photographer) => {
          const additionalCost = (photographer.selectedVideo ? photographer.videoCost : 0) +
                                 (photographer.selectedDrone ? photographer.droneCost : 0);
          const totalCost = photographer.budget + additionalCost;

          return (
            <div key={photographer.id} className="card">
              <h3>{photographer.name}</h3>
              <p>Budget: ${photographer.budget}</p>
              <p>Contact: {photographer.contact}</p>
              <p>Total Cost: ${totalCost}</p>

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
              <button onClick={() => handleSelectPhotographer(photographer)}>
                Book
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotographerBooking;
``
