import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to WeddingWise</h1>
        <h3 style={{color:'white'}}>Your all-in-one event management solution for perfect weddings!</h3>
      </header>

      <section className="indian-weddings">
        <h2>Indian Weddings: A Grand Celebration of Love</h2>
        <img src="https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw=" alt="" />
        <h3>
          Indian weddings are known for their vibrant colors, rich traditions, and multi-day celebrations. 
          With a wide array of pre-wedding rituals, ceremonies, and post-wedding events, Indian weddings are a 
          beautiful blend of cultural significance and modern elements.
        </h3>
        <h3>
          At WeddingWise, we cater to the unique needs of Indian weddings, offering features that 
          help manage everything from the Mehendi and Sangeet to the grand Baraat and reception. 
          Whether you’re looking for traditional decor, the perfect wedding outfit, or the best caterers for a lavish feast, 
          our app has got you covered.
        </h3>
        <h3>
          From planning your dream destination wedding in Udaipur to organizing a simple and elegant ceremony, 
          WeddingWise makes it easy to handle every aspect of your Indian wedding.
        </h3>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-card">
          <h3>Budget Planning</h3>
          <p>Manage your wedding budget effortlessly with our comprehensive planner that helps you track expenses and stay within budget.</p>
        </div>
        <div className="feature-card">
          <h3>Vendor Management</h3>
          <p>Find, compare, and book the best vendors—florists, caterers, photographers, and more for your special day.</p>
        </div>
        <div className="feature-card">
          <h3>Event Timeline</h3>
          <p>Create a detailed timeline with reminders, ensuring everything stays on schedule from pre-wedding events to the big day.</p>
        </div>
        
      </section>

      <section className="about">
        <h2>About Us</h2>
        <h3>
          At WeddingWise, we understand that planning a wedding can be overwhelming. 
          Our app provides tools to simplify the process, ensuring that your wedding planning
          experience is as enjoyable and stress-free as possible. With our user-friendly features, 
          you'll have everything you need to organize your perfect wedding.
        </h3>
        <h3>
          Whether you're planning a small, intimate ceremony or a grand, elaborate event, 
          WeddingWise is here to help every step of the way.
        </h3>
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
        <div className="stat-card">
          <h3>20+</h3>
          <p>Countries Served</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 WeddingWise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
