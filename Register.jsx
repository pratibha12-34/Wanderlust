import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [registerdata, setregisterdata] = useState({ name: '', email: '', username: '', password: '' });
    const [loading, setloading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!registerdata.name.trim()) {
            tempErrors.name = "Name is required";
            isValid = false;
        }

        if (!registerdata.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(registerdata.email)) {
            tempErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!registerdata.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!registerdata.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (registerdata.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setloading(true);
        try {
            const res = await axios.post('http://localhost:3000/auth/register', registerdata, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log("Register response", res.data);
            alert("Registered successfully");
            setregisterdata({ name: '', email: '', username: '', password: '' });
        } catch (err) {
            console.log(err);
            setErrors({ general: "Registration failed. Try again." });
        } finally {
            setloading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setregisterdata(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (errors.general) {
            setErrors(prev => ({ ...prev, general: '' }));
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                </div>
            </div>

            <div className="login-card">
                <div className="login-header">
                    <img src="/register.gif" alt="Register" className="login-gif" />
                    <h1>Register Form</h1>
                    <p>Create your account</p>
                </div>

                {errors.general && (
                    <div className="error-banner">
                        <span className="material-icons">error</span>
                        {errors.general}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            <span className="material-icons">person</span>
                            Name
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={registerdata.name}
                                onChange={handleChange}
                                className={errors.name ? 'error' : ''}
                            />
                            <span className="material-icons input-icon">person_outline</span>
                        </div>
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>
                            <span className="material-icons">email</span>
                            Email
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={registerdata.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                            />
                            <span className="material-icons input-icon">email_outline</span>
                        </div>
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>
                            <span className="material-icons">person</span>
                            Username
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={registerdata.username}
                                onChange={handleChange}
                                className={errors.username ? 'error' : ''}
                            />
                            <span className="material-icons input-icon">account_circle</span>
                        </div>
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label>
                            <span className="material-icons">lock</span>
                            Password
                        </label>
                        <div className="input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={registerdata.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            <span 
                                className="material-icons input-icon toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="material-icons rotating">sync</span>
                                Registering...
                            </>
                        ) : (
                            <>
                                <span className="material-icons">person_add</span>
                                Register
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Already have an account? 
                        <Link to="/auth/login"> Login now</Link>
                    </p>
                </div>

                <div className="login-back">
                    <Link to="/home">
                        <span className="material-icons">arrow_back</span>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

