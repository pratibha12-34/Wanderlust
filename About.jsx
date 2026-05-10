import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Your trusted travel booking partner</p>
      </div>

      {/* Mission Section */}
      <div className="about-section">
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to providing the best travel booking experience for our customers. 
            Our mission is to make travel planning easy, affordable, and enjoyable for everyone. 
            We strive to offer the most competitive prices and excellent customer service.
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <div className="about-section alt-bg">
        <div className="section-content">
          <h2>Who We Are</h2>
          <p>
            We are a team of passionate travel enthusiasts who believe that everyone deserves 
            to explore the world. With years of experience in the travel industry, we've 
            helped thousands of travelers discover their dream destinations.
          </p>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>10,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-card">
              <h3>500+</h3>
              <p>Destinations</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Partner Airlines</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services */}
      <div className="about-section">
        <div className="section-content">
          <h2>Our Services</h2>
          <p>
            We offer a comprehensive range of travel services to meet all your needs:
          </p>
          <ul className="services-list">
            <li>✈️ Flight Booking - Domestic and international flights</li>
            <li>🚗 Car Rental - Wide range of vehicles at competitive prices</li>
            <li>🏨 Hotel Booking - From budget to luxury accommodations</li>
            <li>🗺️ Tour Packages - Curated experiences for unforgettable trips</li>
            <li>📱 Easy Booking - Simple and secure online booking process</li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="about-section alt-bg">
        <div className="section-content">
          <h2>Why Choose Us</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <div className="feature-text">
                <h3>Best Price Guarantee</h3>
                <p>We offer the most competitive prices in the market</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <div className="feature-text">
                <h3>Secure Booking</h3>
                <p>Your personal information and payments are safe with us</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⭐</div>
              <div className="feature-text">
                <h3>Quality Service</h3>
                <p>Verified reviews from real travelers</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📞</div>
              <div className="feature-text">
                <h3>24/7 Support</h3>
                <p>We're here to help you anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="about-cta">
        <h2>Have Questions?</h2>
        <p>Our team is ready to help you plan your perfect trip</p>
        <a href="/contact" className="btn-primary">Contact Us</a>
      </div>
    </div>
  )
}

export default About

