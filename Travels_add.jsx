import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import './Travelsadd.css';

const Travels_add = () => {
    const [travelsadd_data, settravelsadd_data] = useState({ 
        "Place_name": "", 
        "Description": "", 
        
        "Price": "", 
        "Location": "", 
        "Category": "", 
        "Created_at": new Date().toISOString(),
         "imageurl": "",
    });
    const [loading, setloading] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const res = await axios.post('http://localhost:5000/travels/travelsadd', travelsadd_data, {
                headers:{'Content-type': 'application/json'},
            });          
            console.log(res);
            alert("POST ADDED");
            settravelsadd_data({ 
                "Place_name": "", 
                "Description": "", 
                
                "Price": "", 
                "Location": "", 
                "Category": "", 
                "Created_at": new Date().toISOString(),
                 "imageurl": "",
            });
        }
        catch(err){
            console.log("error", err);
            alert("Error adding post: " + err.response?.data?.msg || err.message);
        }
        finally{
            setloading(false);
        }
    }

    return (
        <div>
            <div className="narrow-box">
                <h1>ADD POST FORM</h1>
            </div>
            <section>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-content">
                        <input
                            type="text"
                            name="Place_name"
                            placeholder="Place_name"
                            onChange={(e)=>settravelsadd_data(s => ({...s, Place_name: e.target.value}))}
                            value={travelsadd_data.Place_name}
                            required
                        />
                        <input
                            type="text"
                            name="Location"
                            placeholder="Location"
                            onChange={(e)=>settravelsadd_data(s => ({...s, Location: e.target.value}))}
                            value={travelsadd_data.Location}
                            required
                        />
                        <input
                            type="text"
                            name="Price"
                            placeholder="Price"
                            onChange={(e)=>settravelsadd_data(s => ({...s, Price: e.target.value}))}
                            value={travelsadd_data.Price}
                            required
                        />
                        <input
                            type="text"
                            name="Description"
                            placeholder="Description"
                            onChange={(e)=>settravelsadd_data(s => ({...s, Description: e.target.value}))}
                            value={travelsadd_data.Description}
                            required
                        />
                        <input
                            type="text"
                            name="Category"
                            placeholder="Category"
                            onChange={(e)=>settravelsadd_data(s => ({...s, Category: e.target.value}))}
                            value={travelsadd_data.Category}
                            required
                        />
                        <input
                            type="date"
                            name="Created_at"
                            onChange={(e)=>settravelsadd_data(s => ({...s, Created_at: e.target.value}))}
                            value={travelsadd_data.Created_at.slice(0,10)}
                        />
                        <input
                            type="url"
                            name="imageurl"
                            placeholder="image URL (optional)"
                            onChange={(e)=>settravelsadd_data(s => ({...s, imageurl: e.target.value}))}
                            value={travelsadd_data.imageurl}
                        />
                    </div>
                    <div>
                        <button type="submit" className="register-button" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Post'}
                        </button>
                    </div>
                </form>
            </section>     
        </div>
    )
}

export default Travels_add

