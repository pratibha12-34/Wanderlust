
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    bookings: 0,
    trips: 0,
    favorites: 0
  });
  const navigate = useNavigate();

  // Fetch username from backend
  const fetchUsername = async () => {
    try {
      const storedUsername = localStorage.getItem("username");
      
      if (!storedUsername) {
        navigate("/auth/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/dashboard?username=${storedUsername}`);
        
        if (res.data && res.data.username) {
          setUsername(res.data.username);
        } else {
          setUsername(storedUsername);
        }
      } catch (err) {
        console.log("Backend error, using stored username");
        setUsername(storedUsername);
      }
      
      // Fetch booking stats
      fetchBookingStats(storedUsername);
      setLoading(false);
      
    } catch (err) {
      console.error("Error fetching username:", err);
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
      setLoading(false);
    }
  };

  const fetchBookingStats = async (user) => {
    try {
      const res = await axios.post(`http://localhost:5000/dashboard/Mybookings`, { username: user });
      if (res.data) {
        setStats(prev => ({ ...prev, bookings: res.data.length }));
      }
    } catch (err) {
      console.log("Stats fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/home");
  };

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-loading">
        <img src="/loading.gif" alt="Loading" className="dashboard-loading-gif" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Banner with GIF */}
      <div className="dashboard-welcome-banner">
        <div className="dashboard-welcome-content">
          <img src="/welcome.gif" alt="Welcome" className="dashboard-welcome-gif" />
          <div className="dashboard-welcome-text">
            <h1>Welcome, {username}!</h1>
            <p>Ready for your next adventure?</p>
          </div>
        </div>
        <div className="dashboard-welcome-actions">
          <Link to="/admindashboard" className="dashboard-enter-btn">
            <span>Enter Dashboard</span>
            <span className="material-icons">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon bookings">
            <span className="material-icons">luggage</span>
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.bookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon trips">
            <span className="material-icons">explore</span>
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.trips}</h3>
            <p>Planned Trips</p>
          </div>
        </div>
        
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon favorites">
            <span className="material-icons">favorite</span>
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.favorites}</h3>
            <p>Favorites</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-quick-actions">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="dashboard-actions-grid">
          <Link to="/travels/GetAllTravels" className="dashboard-action-card">
            <span className="material-icons">search</span>
            <span>Explore Travels</span>
          </Link>
          <Link to="/travels/booking" className="dashboard-action-card">
            <span className="material-icons">add_circle</span>
            <span>New Booking</span>
          </Link>
          <Link to="/dashboard/Mybookings" className="dashboard-action-card">
            <span className="material-icons">list_alt</span>
            <span>My Bookings</span>
          </Link>
          <Link to="/dashboard/GetAllCars" className="dashboard-action-card">
            <span className="material-icons">directions_car</span>
            <span>Available Cars</span>
          </Link>
        </div>
      </div>

      {/* Sidebar Layout */}
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <ul className="dashboard-sidebar-menu">
            <li>
              <Link to="/admindashboard">
                <span className="material-icons">dashboard</span>
                <span>Admin Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/Mybookings">
                <span className="material-icons">bookmark</span>
                <span>My Bookings</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/GetAllCars">
                <span className="material-icons">directions_car</span>
                <span>Cars</span>
              </Link>
            </li>
            <li>
              <Link to="">
                <span className="material-icons">category</span>
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <span className="material-icons">info</span>
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/payment">
                <span className="material-icons">payment</span>
                <span>Payment</span>
              </Link>
            </li>
            <li className="dashboard-logout-item">
              <button onClick={handleLogout}>
                <span className="material-icons">logout</span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </aside>

        <main className="dashboard-content">
          <div className="dashboard-main-welcome">
            <h2>Your Travel Dashboard</h2>
            <p>Use the sidebar to navigate or click "Enter Dashboard" above to access the full admin dashboard.</p>
            <div className="dashboard-features">
              <div className="dashboard-feature">
                <span className="material-icons">flight_takeoff</span>
                <h3>Book Travels</h3>
                <p>Plan your next trip</p>
              </div>
              <div className="dashboard-feature">
                <span className="material-icons">directions_car</span>
                <h3>View Cars</h3>
                <p>Choose your vehicle</p>
              </div>
              <div className="dashboard-feature">
                <span className="material-icons">history</span>
                <h3>Past Bookings</h3>
                <p>View your history</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

