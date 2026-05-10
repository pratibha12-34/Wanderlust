import React from 'react'
import './Mybookings.css';

const Mybookings = () => {
  return (
    <div className="mybookings-container">
      <div className="mybookings-header">
        <div className="narrow-box">
          <h1>My Bookings</h1>
        </div>
      </div>
      
      <div className="no-bookings">
        <h2>No Bookings Found</h2>
        <p>You haven't made any bookings yet.</p>
      </div>
    </div>
  )
}

export default Mybookings
