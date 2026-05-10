import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import './Travels.css';

const GetAllTravels = () => {
    const [travels_data, settravels_data] = useState([]);
    const [loading, setloading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTravels();
    }, []);

    const fetchTravels = async () => {
        try {
            const res = await axios.get('http://localhost:5000/travels/GetAllTravels', {
                headers: {'Content-type': 'application/json'},
            });
            console.log(res.data);
            settravels_data(res.data);
        } catch (err) {
            console.log("error", err);
        } finally {
            setloading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchTerm.trim() === "") {
            fetchTravels();
            return;
        }
        try {
            setloading(true);
            const res = await axios.get(`http://localhost:5000/travels/searchbyname/${searchTerm}`, {
                headers: {'Content-type': 'application/json'},
            });
            settravels_data(res.data);
        } catch (err) {
            console.log("error", err);
        } finally {
            setloading(false);
        }
    };

const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this travel?")) {
            try {
                const res = await axios.delete(`http://localhost:5000/travels/delete/${id}`, {
                    headers: {'Content-type': 'application/json'},
                });
                console.log(res);
                alert("Tour deleted successfully!");
                fetchTravels();
            } catch (err) {
                console.error("Delete error:", err);
                alert("Delete failed: " + err.response?.data?.message || err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="getalltravels-container">
                <div className="loading">Loading travels...</div>
            </div>
        );
    }

    return (
        <div className="getalltravels-container">
            <div className="header-flex">
                <div className="narrow-box">
                    <h1>All Travels</h1>
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by place name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div className="action-buttons">
                <ul>
                    <li><a href="/travelsadd"><button>ADD POST </button></a></li>
                    <li><a href="/travelsupdate"><button>UPDATE POST </button></a></li>
                </ul>
            </div>

            {travels_data.length === 0 ? (
                <div className="loading">No travels found</div>
            ) : (
                <ul className="travels-grid">
                    {travels_data.map((travel) => (
                        <li key={travel._id}>
                            <div className="card-image">
                                <img 
src={travel.Imageurl || 'https://via.placeholder.com/300x200/667eea/ffffff?text=Travel'}
                                    alt={travel.Place_name}
                                    className="travel-image"
                                    style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px'}}
                                />
                            </div>
                            <div className="card-content">
                                <h3><span>Location:</span> {travel.Location}</h3>
                                <h3><span>Category:</span> {travel.Category}</h3>
                                <h3><span>Description:</span> {travel.Description}</h3>
                                <h3><span>Created:</span> {travel.Created_at ? new Date(travel.Created_at).toLocaleDateString() : 'N/A'}</h3>
                            </div>
                            <div className="card-action">
                                <a href={`/booking/tour/${travel._id}`}><button>Book Now</button></a>
                                <button onClick={() => handleDelete(travel._id)} style={{marginTop: '0.5rem', background: 'rgba(255, 107, 107, 0.8)'}}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GetAllTravels;

