import React, { useState, useEffect } from 'react';
import './CatererBooking.css'; 
import axios from 'axios';

const CatererBooking = () => {
  const [caterers] = useState([
    { id: 1, name: 'Caterer A', cuisine: 'North', pricePerPerson: 500, contact: '123-456-7890' },
    { id: 2, name: 'Caterer B', cuisine: 'South', pricePerPerson: 400, contact: '234-567-8901' },
    { id: 3, name: 'Caterer C', cuisine: 'North', pricePerPerson: 550, contact: '345-678-9012' },
    { id: 4, name: 'Caterer D', cuisine: 'South', pricePerPerson: 450, contact: '456-789-0123' },
    { id: 5, name: 'Caterer E', cuisine: 'North', pricePerPerson: 600, contact: '567-890-1234' },
    { id: 6, name: 'Caterer F', cuisine: 'South', pricePerPerson: 350, contact: '678-901-2345' },
    { id: 7, name: 'Caterer G', cuisine: 'North', pricePerPerson: 650, contact: '789-012-3456' },
    { id: 8, name: 'Caterer H', cuisine: 'South', pricePerPerson: 300, contact: '890-123-4567' },
    { id: 9, name: 'Caterer I', cuisine: 'North', pricePerPerson: 700, contact: '901-234-5678' },
    { id: 10, name: 'Caterer J', cuisine: 'South', pricePerPerson: 400, contact: '012-345-6789' },
    { id: 11, name: 'Caterer K', cuisine: 'North', pricePerPerson: 550, contact: '123-456-7891' },
    { id: 12, name: 'Caterer L', cuisine: 'South', pricePerPerson: 450, contact: '234-567-8902' },
    { id: 13, name: 'Caterer M', cuisine: 'North', pricePerPerson: 600, contact: '345-678-9013' },
    { id: 14, name: 'Caterer N', cuisine: 'South', pricePerPerson: 350, contact: '456-789-0124' },
    { id: 15, name: 'Caterer O', cuisine: 'North', pricePerPerson: 650, contact: '567-890-1235' },
    { id: 16, name: 'Caterer P', cuisine: 'South', pricePerPerson: 300, contact: '678-901-2346' },
    { id: 17, name: 'Caterer Q', cuisine: 'North', pricePerPerson: 700, contact: '789-012-3457' },
    { id: 18, name: 'Caterer R', cuisine: 'South', pricePerPerson: 400, contact: '890-123-4568' },
    { id: 19, name: 'Caterer S', cuisine: 'North', pricePerPerson: 550, contact: '901-234-5679' },
    { id: 20, name: 'Caterer T', cuisine: 'South', pricePerPerson: 450, contact: '012-345-6780' },
  ]);

  const [selectedCaterer, setSelectedCaterer] = useState(null);
  const [guestCount, setGuestCount] = useState(0);
  const [bookedCaterers, setBookedCaterers] = useState([]);
  
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchBookedCaterers = async () => {
      const userId = localStorage.getItem('id');
      if (userId) {
        try {
          const response = await axios.get(`https://wedding-planner-2.onrender.com/booked-caterers/${userId}`);
          setBookedCaterers(response.data);
        } catch (error) {
          console.error('Error fetching booked caterers:', error);
        }
      }
    };
    fetchBookedCaterers();
  }, []);

  const handleBooking = async (caterer) => {
    if (guestCount <= 0) {
      alert('Guest count must be greater than 0');
      return;
    }

    const userId = localStorage.getItem('id');
    try {
      const response = await axios.post('https://wedding-planner-2.onrender.com/book-caterer', {
        userId,
        catererId: caterer.id,
        catererName: caterer.name,
        guestCount,
        contactNumber: caterer.contact,
        pricePerPerson: caterer.pricePerPerson,
        cuisine: caterer.cuisine
      });
      setBookedCaterers([...bookedCaterers, response.data.booking]);
      setGuestCount(0);
      setSelectedCaterer(null);
    } catch (error) {
      alert(error.response ? error.response.data.error : 'An error occurred while booking the caterer.');
    }
  };

  const cancelBooking = async (id) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`https://wedding-planner-2.onrender.com/cancel-caterer-booking/${id}`);
      setBookedCaterers(bookedCaterers.filter(caterer => caterer._id !== id));
    } catch (error) {
      alert(error.response ? error.response.data.error : 'An error occurred while cancelling the booking.');
    }
  };

  const clearFilters = () => {
    setCuisineFilter('');
    setPriceRange([0, 1000]); 
  };

  const filteredCaterers = caterers.filter(caterer => {
    const isCuisineMatch = !cuisineFilter || caterer.cuisine === cuisineFilter;
    const isPriceMatch = caterer.pricePerPerson >= priceRange[0] && caterer.pricePerPerson <= priceRange[1];
    return isCuisineMatch && isPriceMatch;
  });

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <h1>Caterer Booking for Indian Weddings</h1>

      <div className="filter-section">
        <h3>Filter by Cuisine</h3>
        <select onChange={(e) => setCuisineFilter(e.target.value)}>
          <option value="">All</option>
          <option value="North">North Indian</option>
          <option value="South">South Indian</option>
        </select>

        <h3>Filter by Price Range</h3>
        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
        />
        <span> to </span>
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
        />

        <button onClick={clearFilters} className="clear-filters">Clear Filters</button>
      </div>

      <h2>Booked Caterers</h2>
      <div className="caterer-cards">
        {bookedCaterers.map((booking) => (
          <div className="caterer-card" key={booking.id}>
            <h3>{booking.catererName}</h3>
            <p>Cuisine: {booking.cuisine}</p>
            <p>Price per Person: ₹{booking.pricePerPerson}</p>
            <p>Number of Guests: {booking.guestCount}</p>
            <p>Total Budget: ₹{booking.guestCount * booking.pricePerPerson}</p>
            <p>Contact: {booking.contactNumber}</p>
            <button onClick={() => cancelBooking(booking._id)} style={{backgroundColor:'red'}}>Cancel Booking</button>
          </div>
        ))}
      </div>

      <h2>Our Caterers</h2>
      <div className="caterer-cards">
        {filteredCaterers.map(caterer => (
          <div className="caterer-card" key={caterer.id}>
            <h3>{caterer.name}</h3>
            <p>Cuisine: {caterer.cuisine}</p>
            <p>Price per Person: ₹{caterer.pricePerPerson}</p>
            <input
              type="number"
              placeholder="Number of Guests"
              value={guestCount}
              onChange={(e) => setGuestCount(+e.target.value)}
              min="0"
            />
            <p>Total Budget: ₹{guestCount * caterer.pricePerPerson}</p>
            <button onClick={() => handleBooking(caterer)}>
              Book Caterer
            </button>
            <p>Contact: {caterer.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatererBooking;
