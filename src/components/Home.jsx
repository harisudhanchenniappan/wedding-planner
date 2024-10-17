// src/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to WeddingWise</h1>
        <p>Your all-in-one event management solution for perfect weddings!</p>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-card">
          <h3>Budget Planning</h3>
          <p>Manage your wedding budget effortlessly with our planner.</p>
        </div>
        <div className="feature-card">
          <h3>Vendor Management</h3>
          <p>Find and book the best vendors for your special day.</p>
        </div>
        <div className="feature-card">
          <h3>Guest List Management</h3>
          <p>Keep track of your guests and their RSVP status.</p>
        </div>
        <div className="feature-card">
          <h3>Event Timeline</h3>
          <p>Create a detailed timeline to keep everything on track.</p>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          At WeddingWise, we understand that planning a wedding can be overwhelming.
          Our app provides tools to simplify the process, making your wedding planning
          experience enjoyable and stress-free.
        </p>
      </section>

      <section className="statistics">
        <h2>Our Impact</h2>
        <div className="stat-card">
          <h3>10,000+</h3>
          <p>Happy Users</p>
        </div>
        <div className="stat-card">
          <h3>5,000+</h3>
          <p>Weddings Managed</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 WeddingWise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
