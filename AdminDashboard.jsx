import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    bookings: 0,
    trips: 0,
    favorites: 0,
    totalUsers: 0
  });

  // Fetch username from backend
  const fetchUsername = async () => {
    try {
      const storedUsername = localStorage.getItem("username");
      
      if (!storedUsername) {
        setLoading(false);
        return;
      }

      const res = await axios.get(`http://localhost:5000/dashboard?username=${storedUsername}`);
      
      if (res.data && res.data.username) {
        setUsername(res.data.username);
      } else {
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
      const res = await axios.get(`http://localhost:5000/dashboard/Mybookings?username=${user}`);
      if (res.data) {
        setStats(prev => ({ ...prev, bookings: res.data.length }));
      }
    } catch (err) {
      console.log("Stats fetch error:", err);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/home";
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <img src="/loading.gif" alt="Loading" className="admin-loading-gif" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <span className="material-icons">flight_takeoff</span>
            <span>WanderLust Admin</span>
          </div>
          <div className="admin-user-info">
            <span className="admin-welcome-text">Welcome,</span>
            <span className="admin-username">{username}</span>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <span className="material-icons">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon bookings">
              <span className="material-icons">luggage</span>
            </div>
            <div className="admin-stat-info">
              <h3>{stats.bookings}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          
          <div className="admin-stat-card">
            <div className="admin-stat-icon trips">
              <span className="material-icons">explore</span>
            </div>
            <div className="admin-stat-info">
              <h3>{stats.trips}</h3>
              <p>Planned Trips</p>
            </div>
          </div>
          
          <div className="admin-stat-card">
            <div className="admin-stat-icon favorites">
              <span className="material-icons">favorite</span>
            </div>
            <div className="admin-stat-info">
              <h3>{stats.favorites}</h3>
              <p>Favorites</p>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon users">
              <span className="material-icons">people</span>
            </div>
            <div className="admin-stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-quick-actions">
          <h2 className="admin-section-title">Quick Actions</h2>
          <div className="admin-actions-grid">
            <Link to="/GetAllTravels" className="admin-action-card">
              <span className="material-icons">search</span>
              <span>Explore Travels</span>
            </Link>
            <Link to="/travels/booking" className="admin-action-card">
              <span className="material-icons">add_circle</span>
              <span>New Booking</span>
            </Link>
            <Link to="/dashboard/Mybookings" className="admin-action-card">
              <span className="material-icons">list_alt</span>
              <span>My Bookings</span>
            </Link>
            <Link to="/dashboard/GetAllCars" className="admin-action-card">
              <span className="material-icons">directions_car</span>
              <span>Available Cars</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="admin-layout">
          <aside className="admin-sidebar">
            <h3 className="sidebar-title">Menu</h3>
            <ul className="admin-sidebar-menu">
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
                <Link to="/travels/Category">
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
              <li className="admin-logout-item">
                <button onClick={handleLogout}>
                  <span className="material-icons">logout</span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </aside>

          <main className="admin-content">
            <div className="admin-welcome-section">
              <img src="/welcome.gif" alt="Welcome" className="admin-welcome-gif" />
              <h2>Hello, {username}!</h2>
              <p>Ready for your next adventure?</p>
              <Link to="/GetAllTravels" className="admin-explore-btn">
                Explore Now
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

