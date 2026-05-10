import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Background Pattern */}
      <div className="bg-pattern"></div>
      
      {/* Main Hero Section - Fullscreen */}
      <section className="hero-main">
        <div className="hero-main-content">
          <div className="hero-badge">🚀 New Launch</div>
          <h1 className="hero-title">
            Travel Smart, 
            <span className="gradient-text"> Live Bold</span>
          </h1>
          <p className="hero-subtitle">
            Discover handpicked destinations & premium services with exclusive deals. 
            Your adventure starts here.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span>Happy Travelers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span>Destinations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span>Support</span>
            </div>
          </div>
          <div className="hero-buttons-main">
            <Link to="/travels/GetAllTravels" className="btn-main-primary">
              <span>Explore Now</span>
              <svg className="arrow-icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/carsadd" className="btn-main-secondary">
              Book Cars
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator"></div>
        </div>
      </section>

      {/* Quick Services Row */}
      <section className="services-quick">
        <div className="services-quick-content">
          <div className="service-item">
            <div className="service-icon-large">✈️</div>
            <div>
              <h3>Flights</h3>
              <p>300+ Airlines</p>
            </div>
          </div>
          <div className="service-item">
            <div className="service-icon-large">🚗</div>
            <div>
              <h3>Cars</h3>
              <p>Premium Fleet</p>
            </div>
          </div>
          <div className="service-item">
            <div className="service-icon-large">🏨</div>
            <div>
              <h3>Hotels</h3>
              <p>Verified Stays</p>
            </div>
          </div>
          <div className="service-item">
            <div className="service-icon-large">🚌</div>
            <div>
              <h3>Buses</h3>
              <p>Express Routes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="deals-featured">
        <div className="container">
          <div className="section-header-modern">
            <h2>Featured Deals</h2>
            <span className="section-subtitle">Limited Time Offers</span>
          </div>
          <div className="deals-grid">
            <div className="deal-card">
              <div className="deal-badge">Popular</div>
              <div className="deal-image">🏖️</div>
              <div className="deal-content">
                <div className="deal-location">Goa Beach Escape</div>
                <div className="deal-price">
                  <span className="price-main">₹4,999</span>
                  <span className="price-old">₹7,999</span>
                </div>
                <div className="deal-meta">
                  <span>3N/4D</span>
                  <span>Meals Incl.</span>
                </div>
              </div>
              <Link className="deal-cta" to="/travels/GetAllTravels">View Deal</Link>
            </div>
            <div className="deal-card">
              <div className="deal-image">🏔️</div>
              <div className="deal-content">
                <div className="deal-location">Manali Snow Trek</div>
                <div className="deal-price">
                  <span className="price-main">₹6,499</span>
                  <span className="price-old">₹9,999</span>
                </div>
                <div className="deal-meta">
                  <span>5N/6D</span>
                  <span>Adventure</span>
                </div>
              </div>
              <Link className="deal-cta" to="/travels/GetAllTravels">View Deal</Link>
            </div>
            <div className="deal-card">
              <div className="deal-badge">Hot</div>
              <div className="deal-image">🏙️</div>
              <div className="deal-content">
                <div className="deal-location">Dubai City Tour</div>
                <div className="deal-price">
                  <span className="price-main">₹12,999</span>
                  <span className="price-old">₹18,999</span>
                </div>
                <div className="deal-meta">
                  <span>4N/5D</span>
                  <span>International</span>
                </div>
              </div>
              <Link className="deal-cta" to="/travels/GetAllTravels">View Deal</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="cta-bottom">
        <div className="cta-content">
          <h2>Ready to Travel?</h2>
          <p>Join thousands of happy travelers</p>
          <div className="cta-buttons">
            <Link to="/carsadd" className="btn-cta">Rent a Car</Link>
            <Link to="/travels/GetAllTravels" className="btn-cta-secondary">Browse Travels</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

