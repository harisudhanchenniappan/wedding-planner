import React, { useState } from 'react';
import './HallBooking.css'; // Ensure you have this CSS file for styling

const HallBooking = () => {
  const [halls] = useState([
    { id: 1, name: 'Grand Ballroom', location: 'Chennai', capacity: 300, price: 1500, image: 'https://via.placeholder.com/200x100?text=Grand+Ballroom' },
    { id: 2, name: 'Royal Hall', location: 'Coimbatore', capacity: 200, price: 1200, image: 'https://via.placeholder.com/200x100?text=Royal+Hall' },
    { id: 3, name: 'Garden Pavilion', location: 'Erode', capacity: 150, price: 800, image: 'https://via.placeholder.com/200x100?text=Garden+Pavilion' },
    { id: 4, name: 'Lakeside Banquet', location: 'Salem', capacity: 250, price: 1300, image: 'https://via.placeholder.com/200x100?text=Lakeside+Banquet' },
    { id: 5, name: 'Skyview Terrace', location: 'Trichy', capacity: 180, price: 1000, image: 'https://via.placeholder.com/200x100?text=Skyview+Terrace' },
    { id: 6, name: 'Vintage Hall', location: 'Chennai', capacity: 120, price: 600, image: 'https://via.placeholder.com/200x100?text=Vintage+Hall' },
    { id: 7, name: 'Sunset Garden', location: 'Coimbatore', capacity: 160, price: 900, image: 'https://via.placeholder.com/200x100?text=Sunset+Garden' },
    { id: 8, name: 'Majestic Palace', location: 'Erode', capacity: 350, price: 1800, image: 'https://via.placeholder.com/200x100?text=Majestic+Palace' },
    { id: 9, name: 'Elegant Venue', location: 'Salem', capacity: 220, price: 1100, image: 'https://via.placeholder.com/200x100?text=Elegant+Venue' },
    { id: 10, name: 'Charming Hall', location: 'Trichy', capacity: 130, price: 700, image: 'https://via.placeholder.com/200x100?text=Charming+Hall' },
    { id: 11, name: 'Royal Courtyard', location: 'Chennai', capacity: 400, price: 2000, image: 'https://via.placeholder.com/200x100?text=Royal+Courtyard' },
    { id: 12, name: 'Crystal Banquet', location: 'Coimbatore', capacity: 160, price: 950, image: 'https://via.placeholder.com/200x100?text=Crystal+Banquet' },
  ]);

  const [bookedHalls, setBookedHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', date: '' });
  
  const [locationFilters, setLocationFilters] = useState({
    Chennai: false,
    Coimbatore: false,
    Erode: false,
    Salem: false,
    Trichy: false,
  });
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [capacityRange, setCapacityRange] = useState([0, 400]);
  const [activeFilters, setActiveFilters] = useState({
    location: false,
    price: false,
    capacity: false,
  });

  const handleBooking = (hall) => {
    setSelectedHall(hall);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const confirmBooking = () => {
    setBookedHalls([...bookedHalls, { ...selectedHall, bookingDetails }]);
    setSelectedHall(null);
    setBookingDetails({ name: '', date: '' });
  };

  const cancelBooking = (hallId) => {
    setBookedHalls(bookedHalls.filter(booking => booking.id !== hallId));
  };

  const handleLocationChange = (e) => {
    const { name, checked } = e.target;
    setLocationFilters({ ...locationFilters, [name]: checked });
    setActiveFilters({ ...activeFilters, location: true });
  };

  const clearAllFilters = () => {
    setLocationFilters({
      Chennai: false,
      Coimbatore: false,
      Erode: false,
      Salem: false,
      Trichy: false,
    });
    setPriceRange([0, 2000]);
    setCapacityRange([0, 400]);
    setActiveFilters({
      location: false,
      price: false,
      capacity: false,
    });
  };

  const filteredHalls = halls.filter(hall => {
    const isLocationMatch = Object.keys(locationFilters).some(
      (location) => locationFilters[location] && hall.location === location
    );

    const isPriceMatch = hall.price >= priceRange[0] && hall.price <= priceRange[1];

    const isCapacityMatch = hall.capacity >= capacityRange[0] && hall.capacity <= capacityRange[1];

    return (!activeFilters.location || isLocationMatch) &&
           (!activeFilters.price || isPriceMatch) &&
           (!activeFilters.capacity || isCapacityMatch);
  });

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Wedding Hall Booking</h1>
      <h2>Available Halls</h2>

      <div>
        <h3>Location</h3>
        {Object.keys(locationFilters).map(location => (
          <label key={location}>
            <input
              type="checkbox"
              name={location}
              checked={locationFilters[location]}
              onChange={handleLocationChange}
            />
            {location}
          </label>
        ))}
      </div>

      <div>
        <h3>Price Range</h3>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => {
            setPriceRange([+e.target.value, priceRange[1]]);
            setActiveFilters({ ...activeFilters, price: true });
          }}
          placeholder="Min Price"
        />
        <span> to </span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => {
            setPriceRange([priceRange[0], +e.target.value]);
            setActiveFilters({ ...activeFilters, price: true });
          }}
          placeholder="Max Price"
        />
      </div>

      <div>
        <h3>Seating Capacity Range</h3>
        <input
          type="number"
          value={capacityRange[0]}
          onChange={(e) => {
            setCapacityRange([+e.target.value, capacityRange[1]]);
            setActiveFilters({ ...activeFilters, capacity: true });
          }}
          placeholder="Min Capacity"
        />
        <span> to </span>
        <input
          type="number"
          value={capacityRange[1]}
          onChange={(e) => {
            setCapacityRange([capacityRange[0], +e.target.value]);
            setActiveFilters({ ...activeFilters, capacity: true });
          }}
          placeholder="Max Capacity"
        />
      </div>

      <button onClick={clearAllFilters}>Clear All Filters</button>

      <div className="hall-cards">
        {filteredHalls.map(hall => (
          <div className="hall-card" key={hall.id}>
            <img src={hall.image} alt={hall.name} style={{ width: '100%', height: 'auto' }} />
            <h3>{hall.name}</h3>
            <p>Location: {hall.location}</p>
            <p>Capacity: {hall.capacity}</p>
            <p>Price: ${hall.price}/day</p>
            <button onClick={() => handleBooking(hall)} disabled={bookedHalls.some(b => b.id === hall.id)}>Book</button>
          </div>
        ))}
      </div>

      {selectedHall && (
        <div style={{ marginTop: '20px' }}>
          <h2>Booking Form for {selectedHall.name}</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={bookingDetails.name}
            onChange={handleChange}
            required
            style={{ marginRight: '10px' }}
          />
          <input
            type="date"
            name="date"
            value={bookingDetails.date}
            onChange={handleChange}
            required
            style={{ marginRight: '10px' }}
          />
          <button onClick={confirmBooking}>Confirm Booking</button>
        </div>
      )}

      <h2>Booked Halls</h2>
      <div className="hall-cards">
        {bookedHalls.map((booking) => (
          <div className="hall-card" key={booking.id}>
            <img src={booking.image} alt={booking.name} style={{ width: '100%', height: 'auto' }} />
            <h3>{booking.name}</h3>
            <p>Booked By: {booking.bookingDetails.name}</p>
            <p>Date: {booking.bookingDetails.date}</p>
            <button onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallBooking;
