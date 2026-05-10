import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Cars_add.css';


//carsupdate
const Cars_update = () => {
    const [cardata, setcardata] = useState({ "brand": '', "model": '', "description": "", "mileague": "", "fueltype": "", "imageUrl": '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/dashboard/carsupdate', cardata, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('car upate response:', res);
                        alert("CAR POST UPDATED")
            setcardata({ "brand": '', "model": '', "description": "", "mileague": "", "fueltype": "", "imageUrl": '' });

        }
        catch (err) {
            console.error('Cars_update_error:', err);
        }
        finally {
            setLoading(false);
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setlogindata(prev => ({ ...prev, [name]: value }));
    //     if (errors[name]) {
    //         setErrors(prev => ({ ...prev, [name]: "" }));
    //     }
    //     if (errors.general) {
    //         setErrors(prev => ({ ...prev, general: "" }));
    //     }
    // };
    return (
        

        <div>     
            <div className="narrow-box">
                  <h1>UPDATE FORM</h1>
             </div> 
 {/* <div className="login-header"> 
              </div>      */}
                {/* <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Mechanic Character" className="form-gif-right" /> */}


    <section>
                <form className="form-container" onSubmit={handleSubmit}>
                   
                        <div className="form-content">
                            <input
                                type="text"
                                name="brand"
                                placeholder="Enter your car brand"
                                value={cardata.brand}
                                onChange={(e) => setcardata(s => ({ ...s, brand: e.target.value }))}
                            // className={errors.brand? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                       
                        {/* {errors.brand && <span className="error-text">{errors.brand}</span>} */}
               


                   
                            <input
                                type="text"
                                name="model"
                                placeholder="Enter your car brand"
                                value={cardata.model}
                                onChange={(e) => setcardata(s => ({ ...s, model: e.target.value }))}
                            // className={errors.model? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                       
                        {/* {errors.model && <span className="error-text">{errors.model}</span>} */}
                    


                    
                      
                            <input
                                type="text"
                                name="description"
                                placeholder="Enter your car description"
                                value={cardata.description}
                                onChange={(e) => setcardata(s => ({ ...s, description: e.target.value }))}
                            // className={errors.description? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                       
                        {/* {errors.description && <span className="error-text">{errors.description}</span>} */}
                  


                    
                            <input
                                type="text"
                                name="fueltype"
                                placeholder="Enter your car fueltype"
                                value={cardata.fueltype}
                                onChange={(e) => setcardata(s => ({ ...s, fueltype: e.target.value }))}
                            // className={errors.fueltype? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                        
                        {/* {errors.fueltype && <span className="error-text">{errors.fueltype}</span>} */}
                 


                 
                            <input
                                type="text"
                                name="mileague"
                                placeholder="Enter your mileague"
                                value={cardata.mileague}
                                onChange={(e) => setcardata(s => ({ ...s, mileague: e.target.value }))}
                            // className={errors.mileague? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
        
                            <input
                                type="url"
                                name="imageUrl"
                                placeholder="enter image url"
                                value={cardata.imageUrl}
                                onChange={(e) => setcardata(s => ({ ...s, imageUrl: e.target.value }))}
                            />
                            <span className="material-icons input-icon">image</span>
                      
                    

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Updating..' : 'UPDATEPOST' }
                    </button>
                </div>
                </form>

                </section>
    </div>        
    );
};


//getallcars

const GetAllCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await axios.get('http://localhost:5000/dashboard/GetAllCars');
                setCars(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

     const handleSearch = async (e) => {
            e.preventDefault();
            if (searchTerm.trim() === "") {
                fetchCars();
                return;
            }
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/dashboard/searchbyname/${searchTerm}`, {
                    headers: {'Content-type': 'application/json'},
                });
                setCars(res.data);
            } catch (err) {
                console.log("error", err);
            } finally {
                setLoading(false);
            }
        };

 const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this car?')) return;
        try {
            const res = await axios.delete(`http://localhost:5000/dashboard/delete/${id}`, {
                headers: {'Content-type': 'application/json'},
            });
            console.log(res);
            alert("Car deleted successfully");
            fetchCars();
        } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed: " + err.response?.data?.message || err.message);
        }
    };

     if (loading) {
        return (
            <div className="getalltravels-container">
                <div className="loading">Loading cars...</div>
            </div>
        );
    }


    return (
         <div className="getalltravels-container">
            <div className="header-flex">
                <div className='narrow-box'>
                    <h1>All Cars</h1>
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by brand and model..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div> 

            <div className="action-buttons">
                <ul>
                    <li><a href="/carsadd"><button>ADD POST </button></a></li>
                    <li><a href="/carsupdate"><button>UPDATE POST </button></a></li>
                </ul>
            </div>
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : (
                <ul className="travels-grid">
                    {cars.map((car) => 
                        (
                            <li key={car.brand}>
                                <div className="card-image">
                                <img 
                                    src={car.imageUrl } 
                                    alt={`${car.brand} ${car.model}`}
                                    className="card-image"/> 
                                
                                </div>

                                <div className="card-content">
                                <h3>brand: {car.brand}</h3>
                                <h3>model: {car.model}</h3>
                                <h3>fueltype: {car.fueltype}</h3>
                                <h3>description: {car.description}</h3>
                                <h3>mileague: {car.mileague}</h3>
                                </div>

                                <div className="card-action">
<a href={`/booking/car/${car._id}`}><button>Book now</button></a>
 <button onClick={() => handleDelete(car._id)} style={{marginTop: '0.5rem', background: 'rgba(255, 107, 107, 0.8)'}}>Delete</button>
                            
                           </div>
                            </li>
                     
                   
                    ))}
                </ul>
                
           
                )}

        </div>
    );

};






//cars_add
const Cars_add = () => {
    const [cardata, setcardata] = useState({ "brand": '', "model": '', "description": "", "mileague": "", "fueltype": "", "imageUrl": '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/dashboard/carsadd', cardata, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('car response:', res);
                        alert("CAR POST ADDED")
            setcardata({ "brand": '', "model": '', "description": "", "mileague": "", "fueltype": "", "imageUrl": '' });

        }
        catch (err) {
            console.error('Cars_add_error:', err);
        }
        finally {
            setLoading(false);
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setlogindata(prev => ({ ...prev, [name]: value }));
    //     if (errors[name]) {
    //         setErrors(prev => ({ ...prev, [name]: "" }));
    //     }
    //     if (errors.general) {
    //         setErrors(prev => ({ ...prev, general: "" }));
    //     }
    // };
    return (
        

            
        <div >
                
                <div className="narrow-box">
                    <h1>ADD POST FORM</h1>
                    {/* <img src="/register.gif" alt="Car Add" className="form-gif" /> */}
                </div>

                <section>

                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-content">
                       
                       
                            <input
                                type="text"
                                name="brand"
                                placeholder="Enter your car brand"
                                value={cardata.brand}
                                onChange={(e) => setcardata(s => ({ ...s, brand: e.target.value }))}
                            // className={errors.brand? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                    
                        {/* {errors.brand && <span className="error-text">{errors.brand}</span>} */}
                


                            <input
                                type="text"
                                name="model"
                                placeholder="Enter your car model"
                                value={cardata.model}
                                onChange={(e) => setcardata(s => ({ ...s, model: e.target.value }))}
                            // className={errors.model? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                    
                        {/* {errors.model && <span className="error-text">{errors.model}</span>} */}
                


                  
                            <input
                                type="text"
                                name="description"
                                placeholder="Enter your car description"
                                value={cardata.description}
                                onChange={(e) => setcardata(s => ({ ...s, description: e.target.value }))}
                            // className={errors.description? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                        
                        {/* {errors.description && <span className="error-text">{errors.description}</span>} */}
                 


                            <input
                                type="text"
                                name="fueltype"
                                placeholder="Enter your car fueltype"
                                value={cardata.fueltype}
                                onChange={(e) => setcardata(s => ({ ...s, fueltype: e.target.value }))}
                            // className={errors.fueltype? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                 
                        {/* {errors.fueltype && <span className="error-text">{errors.fueltype}</span>} */}
                   



                            <input
                                type="text"
                                name="mileague"
                                placeholder="Enter your car mileague"
                                value={cardata.mileague}
                                onChange={(e) => setcardata(s => ({ ...s, mileague: e.target.value }))}
                            // className={errors.mileague? 'error' : ''}
                            />
                            <span className="material-icons input-icon"></span>
                       

                   
                            <input
                                type="url"
                                name="imageUrl"
                                placeholder="enter image url"
                                value={cardata.imageUrl}
                                onChange={(e) => setcardata(s => ({ ...s, imageUrl: e.target.value }))}
                            />
                            <span className="material-icons input-icon">image</span>
                  

                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? 'Adding..' : 'AddPost' }
                    </button>
                        </div>
                </form>
                </section> 
                
            </div>
        
    );
};

export default Cars_add ;
export { GetAllCars, Cars_update };
