import React, { useState } from 'react';
import './DecoratorBooking.css'; 

const DecoratorBooking = () => {
  const [decorators] = useState([
    { id: 1, name: 'Decorator A', minBudget: 20000, theme: 'Traditional', contact: '123-456-7890' },
    { id: 2, name: 'Decorator B', minBudget: 25000, theme: 'Modern', contact: '234-567-8901' },
    { id: 3, name: 'Decorator C', minBudget: 30000, theme: 'Rustic', contact: '345-678-9012' },
    { id: 4, name: 'Decorator D', minBudget: 18000, theme: 'Beach', contact: '456-789-0123' },
    { id: 5, name: 'Decorator E', minBudget: 22000, theme: 'Royal', contact: '567-890-1234' },
    { id: 6, name: 'Decorator F', minBudget: 15000, theme: 'Garden', contact: '678-901-2345' },
    { id: 7, name: 'Decorator G', minBudget: 35000, theme: 'Fairytale', contact: '789-012-3456' },
    { id: 8, name: 'Decorator H', minBudget: 27000, theme: 'Vintage', contact: '890-123-4567' },
    { id: 9, name: 'Decorator I', minBudget: 30000, theme: 'Festival', contact: '901-234-5678' },
    { id: 10, name: 'Decorator J', minBudget: 40000, theme: 'Minimalist', contact: '012-345-6789' },
    { id: 11, name: 'Decorator K', minBudget: 22000, theme: 'Classic', contact: '123-456-7891' },
    { id: 12, name: 'Decorator L', minBudget: 32000, theme: 'Bohemian', contact: '234-567-8902' },
    { id: 13, name: 'Decorator M', minBudget: 26000, theme: 'Sangeet', contact: '345-678-9013' },
    { id: 14, name: 'Decorator N', minBudget: 19000, theme: 'Cultural', contact: '456-789-0124' },
    { id: 15, name: 'Decorator O', minBudget: 23000, theme: 'Mughal', contact: '567-890-1235' },
    { id: 16, name: 'Decorator P', minBudget: 31000, theme: 'Elegant', contact: '678-901-2346' },
    { id: 17, name: 'Decorator Q', minBudget: 18000, theme: 'Eco-friendly', contact: '789-012-3457' },
    { id: 18, name: 'Decorator R', minBudget: 36000, theme: 'Luxury', contact: '890-123-4568' },
    { id: 19, name: 'Decorator S', minBudget: 24000, theme: 'Thematic', contact: '901-234-5679' },
    { id: 20, name: 'Decorator T', minBudget: 28000, theme: 'Abstract', contact: '012-345-6780' },
  ]);

  const [bookedDecorators, setBookedDecorators] = useState([]);
  const [bookingDate, setBookingDate] = useState('');

  const bookDecorator = (decorator) => {
    setBookedDecorators([...bookedDecorators, { ...decorator, bookingDate }]);
    setBookingDate('');
  };

  const cancelBooking = (id) => {
    setBookedDecorators(bookedDecorators.filter(decorator => decorator.id !== id));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Decorator Booking for Indian Weddings</h1>

      <h2>Booked Decorators</h2>
      <div className="decorator-cards">
        {bookedDecorators.map((booking) => (
          <div className="decorator-card" key={booking.id}>
            <h3>{booking.name}</h3>
            <p>Min Budget: ₹{booking.minBudget}</p>
            <p>Theme: {booking.theme}</p>
            <p>Contact: {booking.contact}</p>
            <p>Booking Date: {booking.bookingDate}</p>
            <button onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
          </div>
        ))}
      </div>

      <h2>Available Decorators</h2>
      <div className="decorator-cards">
        {decorators.map(decorator => (
          <div className="decorator-card" key={decorator.id}>
            <h3>{decorator.name}</h3>
            <p>Min Budget: ₹{decorator.minBudget}</p>
            <p>Theme: {decorator.theme}</p>
            <p>Contact: {decorator.contact}</p>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              placeholder="Select Booking Date"
            />
            <button onClick={() => bookDecorator(decorator)}>
              Book Decorator
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecoratorBooking;
