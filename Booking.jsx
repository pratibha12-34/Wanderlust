import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import './Booking.css';

const stripePromise = loadStripe('pk_test_51TGZW8IJosy8wL34dROV7c0Tc5ujASH1VvPXSY6FcJaUSeY7eyG1pRfWgZBxk3hNqcyNiCPEaPWR9nl85DJ3xziH00xVPDLblj'); // Replace with your Stripe publishable key;

const carbooking = () => {
    const [bookingdata, setbookingdata] = useState({
        username: "",
        Placename: "",
        email: "",
        password: "",
        contact: "",
        Pickup_location: "",
        Drop_location: "",
        Pickup_date_and_Time: "",
        Drop_date: "",
        car: "",
        Payment_amount: ""
    });
    const [loading, setloading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const cardRef = useRef();
    const { type, id } = useParams();

    // Validation function
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!bookingdata.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!bookingdata.Placename.trim()) {
            tempErrors.Placename = "Place name is required";
            isValid = false;
        }

        if (!bookingdata.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(bookingdata.email)) {
            tempErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!bookingdata.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (bookingdata.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!bookingdata.contact.trim()) {
            tempErrors.contact = "Contact is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(bookingdata.contact)) {
            tempErrors.contact = "Contact must be 10 digits";
            isValid = false;
        }

        if (!bookingdata.Pickup_location.trim()) {
            tempErrors.Pickup_location = "Pickup location is required";
            isValid = false;
        }

        if (!bookingdata.Drop_location.trim()) {
            tempErrors.Drop_location = "Drop location is required";
            isValid = false;
        }

        if (!bookingdata.Pickup_date_and_Time) {
            tempErrors.Pickup_date_and_Time = "Pickup date and time is required";
            isValid = false;
        }

        if (!bookingdata.Drop_date) {
            tempErrors.Drop_date = "Drop date is required";
            isValid = false;
        }

        if (!bookingdata.car.trim()) {
            tempErrors.car = "Car selection is required";
            isValid = false;
        }

        if (!bookingdata.Payment_amount.trim()) {
            tempErrors.Payment_amount = "Payment amount is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setCardError('');

        if (!validateForm()) {
            return;
        }

        setProcessing(true);

        try {
            const bookingData = { ...bookingdata, metadata: { type: type || 'tour', id: id || '' } };
const response = await axios.post('http://localhost:5000/payment/createPaymentIntent', {
                amount: parseFloat(bookingData.Payment_amount),
                metadata: bookingData.metadata
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { client_secret } = response.data;


const stripe = await stripePromise;
            const elements = stripe.elements();
            const cardElement = elements.create('card', {
                style: {
                    base: {
                        color: '#32325d',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',
                        '::placeholder': {
                            color: '#aab7c4'
                        }
                    }
                }
            });
            
            // Clear any existing content
            cardRef.current.innerHTML = '';
            cardElement.mount(cardRef.current);


            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: bookingData.username,
                        email: bookingData.email,
                    },
                }
            });

            if (result.error) {
                setCardError(result.error.message);
            } else {
                bookingData.payment_intent = result.paymentIntent.id;
const res = await axios.post('http://localhost:5000/payment/booking', bookingData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log("Booking Response:", res.data);
                alert("Payment and Booking confirmed!");
                setSuccess(true);
                setbookingdata({
                    username: "",
                    Placename: "",
                    email: "",
                    password: "",
                    contact: "",
                    Pickup_location: "",
                    Drop_location: "",
                    Pickup_date_and_Time: "",
                    Drop_date: "",
                    car: "",
                    Payment_amount: ""
                });
                setErrors({});
            }
        } catch (err) {
            console.error("Payment Error:", err);
            setCardError(err.response?.data?.error || err.message || 'Payment failed');
        } finally {
            setProcessing(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setbookingdata(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-background">
                <div className="booking-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>

            <div className="booking-card">
                <div className="booking-header">
                    <span className="material-icons booking-icon">flight_takeoff</span>
                    <h1>Book Your Trip</h1>
                    <p>Fill in the details to book your dream vacation</p>
                </div>

                {success && (
                    <div className="success-message">
                        <img src="/paymentsuccess.gif" alt="Success" className="success-gif" />
                        <p>Booking confirmed successfully!</p>
                    </div>
                )}


                <form className="booking-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>
                                <span className="material-icons">person</span>
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={bookingdata.username}
                                onChange={handleChange}
                                className={errors.username ? 'error' : ''}
                            />
                            {errors.username && <span className="error-text">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">email</span>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={bookingdata.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">place</span>
                                Place Name
                            </label>
                            <input
                                type="text"
                                name="Placename"
                                placeholder="Where do you want to go?"
                                value={bookingdata.Placename}
                                onChange={handleChange}
                                className={errors.Placename ? 'error' : ''}
                            />
                            {errors.Placename && <span className="error-text">{errors.Placename}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">lock</span>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={bookingdata.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">phone</span>
                                Contact
                            </label>
                            <input
                                type="tel"
                                name="contact"
                                placeholder="10-digit contact number"
                                value={bookingdata.contact}
                                onChange={handleChange}
                                maxLength={10}
                                className={errors.contact ? 'error' : ''}
                            />
                            {errors.contact && <span className="error-text">{errors.contact}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">directions_car</span>
                                Select Car
                            </label>
                            <select
                                name="car"
                                value={bookingdata.car}
                                onChange={handleChange}
                                className={errors.car ? 'error' : ''}
                            >
                                <option value="">Select a car</option>
                                <option value="Swift Dzire">Swift Dzire</option>
                                <option value="Honda City">Honda City</option>
                                <option value="Toyota Innova">Toyota Innova</option>
                                <option value="Mahindra XUV500">Mahindra XUV500</option>
                                <option value="ERTIGA">ERTIGA</option>
                            </select>
                            {errors.car && <span className="error-text">{errors.car}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">schedule</span>
                                Pickup Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                name="Pickup_date_and_Time"
                                value={bookingdata.Pickup_date_and_Time}
                                onChange={handleChange}
                                className={errors.Pickup_date_and_Time ? 'error' : ''}
                            />
                            {errors.Pickup_date_and_Time && <span className="error-text">{errors.Pickup_date_and_Time}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">event</span>
                                Drop Date
                            </label>
                            <input
                                type="date"
                                name="Drop_date"
                                value={bookingdata.Drop_date}
                                onChange={handleChange}
                                className={errors.Drop_date ? 'error' : ''}
                            />
                            {errors.Drop_date && <span className="error-text">{errors.Drop_date}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label>
                                <span className="material-icons">location_on</span>
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                name="Pickup_location"
                                placeholder="Enter pickup location"
                                value={bookingdata.Pickup_location}
                                onChange={handleChange}
                                className={errors.Pickup_location ? 'error' : ''}
                            />
                            {errors.Pickup_location && <span className="error-text">{errors.Pickup_location}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label>
                                <span className="material-icons">flag</span>
                                Drop Location
                            </label>
                            <input
                                type="text"
                                name="Drop_location"
                                placeholder="Enter drop location"
                                value={bookingdata.Drop_location}
                                onChange={handleChange}
                                className={errors.Drop_location ? 'error' : ''}
                            />
                            {errors.Drop_location && <span className="error-text">{errors.Drop_location}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label>
                                <span className="material-icons">attach_money</span>
                                Payment Amount
                            </label>
                            <input
                                type="number"
                                name="Payment_amount"
                                placeholder="Enter payment amount"
                                value={bookingdata.Payment_amount}
                                onChange={handleChange}
                                className={errors.Payment_amount ? 'error' : ''}
                            />

                            {errors.Payment_amount && <span className="error-text">{errors.Payment_amount}</span>}
                        </div>
                        <div className="form-group full-width" id="stripe-card-group">
                            <label>
                                <span className="material-icons">credit_card</span>
                                Card Details
                            </label>


<div id="card-element" ref={cardRef} className="StripeElement"></div>


                            {cardError && <span className="error-text">{cardError}</span>}
                        </div>
                    </div>


                    <div className="form-actions">

                        <button type="button" className="submit-btn" onClick={handlePayment} disabled={processing || loading}>
                            {processing ? (
                                <>
                                    <span className="material-icons rotating">sync</span>
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <span className="material-icons">payment</span>
                                    Pay Rs. {bookingdata.Payment_amount} & Book Now
                                </>
                            )}
                        </button>

                        
                    </div>
                </form>
            </div>
        </div>
    );
};




const tourbooking = () => {
    const [bookingdata, setbookingdata] = useState({
        username: "",
        Placename: "",
        email: "",
        password: "",
        contact: "",
        Pickup_location: "",
        Drop_location: "",
        Pickup_date_and_Time: "",
        Drop_date: "",
        car: "",
        Number_of_Passengers: "",
        Payment_amount: ""
    });
    const [loading, setloading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const cardRef = useRef();
    const { type, id } = useParams();

    // Validation function
    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!bookingdata.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!bookingdata.Placename.trim()) {
            tempErrors.Placename = "Place name is required";
            isValid = false;
        }

        if (!bookingdata.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(bookingdata.email)) {
            tempErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!bookingdata.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (bookingdata.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!bookingdata.contact.trim()) {
            tempErrors.contact = "Contact is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(bookingdata.contact)) {
            tempErrors.contact = "Contact must be 10 digits";
            isValid = false;
        }

        if (!bookingdata.Pickup_location.trim()) {
            tempErrors.Pickup_location = "Pickup location is required";
            isValid = false;
        }

        if (!bookingdata.Drop_location.trim()) {
            tempErrors.Drop_location = "Drop location is required";
            isValid = false;
        }

        if (!bookingdata.Pickup_date_and_Time) {
            tempErrors.Pickup_date_and_Time = "Pickup date and time is required";
            isValid = false;
        }

        if (!bookingdata.Drop_date) {
            tempErrors.Drop_date = "Drop date is required";
            isValid = false;
        }

        if (!bookingdata.car.trim()) {
            tempErrors.car = "Car selection is required";
            isValid = false;
        }

        if (!bookingdata.Number_of_Passengers.trim()) {
            tempErrors.Number_of_Passengers = "Number of passengers is required";
            isValid = false;
        }

        if (!bookingdata.Payment_amount.trim()) {
            tempErrors.Payment_amount = "Payment amount is required";
            isValid = false;
        }
        
        setErrors(tempErrors);
        return isValid;
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setCardError('');

        if (!validateForm()) {
            return;
        }

        setProcessing(true);

        try {
            const bookingData = { ...bookingdata, metadata: { type: type || 'tour', id: id || '' } };
const response = await axios.post('http://localhost:5000/payment/createPaymentIntent', {
                amount: parseFloat(bookingData.Payment_amount),
                metadata: bookingData.metadata
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { client_secret } = response.data;

            const stripe = await stripePromise;
            const elements = stripe.elements();
            const cardElement = elements.create('card', {
                style: {
                    base: {
                        color: '#32325d',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',
                        '::placeholder': {
                            color: '#aab7c4'
                        }
                    }
                }
            });

            cardElement.mount(cardRef.current);

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: bookingData.username,
                        email: bookingData.email,
                    },
                }
            });

            if (result.error) {
                setCardError(result.error.message);
            } else {
                bookingData.payment_intent = result.paymentIntent.id;
const res = await axios.post('http://localhost:5000/payment/booking', bookingData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log("Booking Response:", res.data);
                alert("Payment and Booking confirmed!");
                setSuccess(true);
                setbookingdata({
                    username: "",
                    Placename: "",
                    email: "",
                    password: "",
                    contact: "",
                    Pickup_location: "",
                    Drop_location: "",
                    Pickup_date_and_Time: "",
                    Drop_date: "",
                    car: "",
                    Number_of_Passengers: "",
                    Payment_amount: ""
                });
                setErrors({});
            }
        } catch (err) {
            console.error("Payment Error:", err);
            setCardError(err.response?.data?.error || err.message || 'Payment failed');
        } finally {
            setProcessing(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setbookingdata(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-background">
                <div className="booking-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>

            <div className="booking-card">
                <div className="booking-header">
                    <span className="material-icons booking-icon">flight_takeoff</span>
                    <h1>Book Your Trip</h1>
                    <p>Fill in the details to book your dream vacation</p>
                </div>

                {success && (
                    <div className="success-message">
                        <img src="/paymentsuccess.gif" alt="Success" className="success-gif" />
                        <p>Booking confirmed successfully!</p>
                    </div>
                )}


                <form className="booking-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>
                                <span className="material-icons">person</span>
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={bookingdata.username}
                                onChange={handleChange}
                                className={errors.username ? 'error' : ''}
                            />
                            {errors.username && <span className="error-text">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">email</span>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={bookingdata.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">place</span>
                                Place Name
                            </label>
                            <input
                                type="text"
                                name="Placename"
                                placeholder="Where do you want to go?"
                                value={bookingdata.Placename}
                                onChange={handleChange}
                                className={errors.Placename ? 'error' : ''}
                            />
                            {errors.Placename && <span className="error-text">{errors.Placename}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">lock</span>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={bookingdata.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">phone</span>
                                Contact
                            </label>
                            <input
                                type="tel"
                                name="contact"
                                placeholder="10-digit contact number"
                                value={bookingdata.contact}
                                onChange={handleChange}
                                maxLength={10}
                                className={errors.contact ? 'error' : ''}
                            />
                            {errors.contact && <span className="error-text">{errors.contact}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">directions_car</span>
                                Select Car
                            </label>
                            <select
                                name="car"
                                value={bookingdata.car}
                                onChange={handleChange}
                                className={errors.car ? 'error' : ''}
                            >
                                <option value="">Select a car</option>
                                <option value="Swift Dzire">Swift Dzire</option>
                                <option value="Honda City">Honda City</option>
                                <option value="Toyota Innova">Toyota Innova</option>
                                <option value="Mahindra XUV500">Mahindra XUV500</option>
                                <option value="ERTIGA">ERTIGA</option>
                            </select>
                            {errors.car && <span className="error-text">{errors.car}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">schedule</span>
                                Pickup Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                name="Pickup_date_and_Time"
                                value={bookingdata.Pickup_date_and_Time}
                                onChange={handleChange}
                                className={errors.Pickup_date_and_Time ? 'error' : ''}
                            />
                            {errors.Pickup_date_and_Time && <span className="error-text">{errors.Pickup_date_and_Time}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="material-icons">event</span>
                                Drop Date
                            </label>
                            <input
                                type="date"
                                name="Drop_date"
                                value={bookingdata.Drop_date}
                                onChange={handleChange}
                                className={errors.Drop_date ? 'error' : ''}
                            />
                            {errors.Drop_date && <span className="error-text">{errors.Drop_date}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label>
                                <span className="material-icons">location_on</span>
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                name="Pickup_location"
                                placeholder="Enter pickup location"
                                value={bookingdata.Pickup_location}
                                onChange={handleChange}
                                className={errors.Pickup_location ? 'error' : ''}
                            />
                            {errors.Pickup_location && <span className="error-text">{errors.Pickup_location}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label>
                                <span className="material-icons">flag</span>
                                Drop Location
                            </label>
                            <input
                                type="text"
                                name="Drop_location"
                                placeholder="Enter drop location"
                                value={bookingdata.Drop_location}
                                onChange={handleChange}
                                className={errors.Drop_location ? 'error' : ''}
                            />
                            {errors.Drop_location && <span className="error-text">{errors.Drop_location}</span>}
                        </div>

                        <div className="form-group full-width">
                            <label>
                                <span className="material-icons">attach_money</span>
                                Payment Amount
                            </label>
                            <input
                                type="number"
                                name="Payment_amount"
                                placeholder="Enter payment amount"
                                value={bookingdata.Payment_amount}
                                onChange={handleChange}
                                className={errors.Payment_amount ? 'error' : ''}
                            />

                            {errors.Payment_amount && <span className="error-text">{errors.Payment_amount}</span>}
                        </div>
                        <div className="form-group full-width" id="stripe-card-group">
                            <label>
                                <span className="material-icons">credit_card</span>
                                Card Details
                            </label>

<div id="card-element"  className="StripeElement StripeElement--empty">
    {/* Stripe automatically fills this - NO manual content needed */}
</div>

                            {cardError && <span className="error-text">{cardError}</span>}
                        </div>
                    </div>


                    <div className="form-actions">

                        <button type="button" className="submit-btn" onClick={handlePayment} disabled={processing || loading}>
                            {processing ? (
                                <>
                                    <span className="material-icons rotating">sync</span>
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <span className="material-icons">payment</span>
                                    Pay Rs. {bookingdata.Payment_amount} & Book Now
                                </>
                            )}
                        </button>

                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default carbooking;


export  {tourbooking};

