import React, { useState, useEffect } from 'react';
import './HallBooking.css';
import axios from 'axios';

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

  useEffect(() => {
    const fetchBookedHalls = async () => {
      const userId = localStorage.getItem('id');
      if (!userId) return;

      try {
        const response = await axios.get(`https://wedding-planner-2.onrender.com/booked-halls/${userId}`);
        setBookedHalls(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
      }
    };

    fetchBookedHalls();
  }, []);

  const handleBooking = (hall) => {
    setSelectedHall(hall);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const confirmBooking = async () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      alert('You must be logged in to book a hall.');
      return;
    }

    try {
      const response = await axios.post('https://wedding-planner-2.onrender.com/book-hall', {
        userId,
        hallId: selectedHall.id,
        hallName: selectedHall.name,
        bookingDetails,
      });
      setBookedHalls([...bookedHalls, response.data.booking]);
      setSelectedHall(null);
      setBookingDetails({ name: '', date: '' });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.error : 'An error occurred while booking the hall.');
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`https://wedding-planner-2.onrender.com/cancel-booking/${bookingId}`);
      setBookedHalls(bookedHalls.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.error : 'An error occurred while cancelling the booking.');
    }
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

  const filteredHalls = halls.filter((hall) => {
    const isLocationMatch = Object.keys(locationFilters).some(
      (location) => locationFilters[location] && hall.location === location
    );

    const isPriceMatch = hall.price >= priceRange[0] && hall.price <= priceRange[1];

    const isCapacityMatch = hall.capacity >= capacityRange[0] && hall.capacity <= capacityRange[1];

    return (
      (!activeFilters.location || isLocationMatch) &&
      (!activeFilters.price || isPriceMatch) &&
      (!activeFilters.capacity || isCapacityMatch)
    );
  });

  return (
    <div className="hall-booking-container">
      <h1>Wedding Hall Booking</h1>

      <div className="filters">
        <div className="filter-section">
          <h3>Location</h3>
          {Object.keys(locationFilters).map((location) => (
            <label key={location} style={{color:'black'}}>
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

        <div className="filter-section">
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

        <div className="filter-section">
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

        <button className="clear-filters" onClick={clearAllFilters}>
          Clear All Filters
        </button>
      </div>

      {selectedHall && (
        <div className="booking-form">
          <h2>Booking for {selectedHall.name}</h2>
          <label>
            Your Name:
            <input type="text" name="name" value={bookingDetails.name} onChange={handleChange} />
          </label>
          <label>
            Booking Date:
            <input type="date" name="date" value={bookingDetails.date} onChange={handleChange} />
          </label>
          <button onClick={confirmBooking}>Confirm Booking</button>
          <button onClick={() => setSelectedHall(null)}>Cancel</button>
        </div>
      )}

      <h2>Your Bookings</h2>
      <div className="booked-halls-list">
        {bookedHalls.map((booking) => (
          <div key={booking._id} className="booked-hall-card">
            <h3>{booking.hallName}</h3>
            <p>Booking Date: {booking.bookingDetails.date}</p>
            <button onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
          </div>
        ))}
      </div>

      <h2>Available Halls</h2>

      <div className="hall-list">
        {filteredHalls.map((hall) => (
          <div key={hall.id} className="hall-card">
            <img src={hall.image} alt={hall.name} />
            <h2>{hall.name}</h2>
            <p>{hall.location}</p>
            <p>Capacity: {hall.capacity}</p>
            <p>Price: ${hall.price}</p>
            <button onClick={() => handleBooking(hall)}>Book Now</button>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default HallBooking;
