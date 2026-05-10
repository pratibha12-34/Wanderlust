import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [logindata, setlogindata] = useState({ "username": '', "password": '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!logindata.username.trim()) {
            tempErrors.username = "Username is required";
            isValid = false;
        }

        if (!logindata.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (logindata.password.length < 6) {
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

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/auth/login', logindata, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('login response:', res.data);
            alert("Login successful");
            if (res.data && res.data.user && res.data.user[0]) {
                localStorage.setItem("username", res.data.user[0]);
            } else {
                localStorage.setItem("username", logindata.username);
            }
            
            // Navigate to dashboard
            window.location.href = "/dashboard";
        } catch (err) {
            console.error('Login error:', err.response ?? err.message);
            setErrors({
                general: "Invalid username or password. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setlogindata(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
        if (errors.general) {
            setErrors(prev => ({ ...prev, general: "" }));
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
                    <img src="/login.gif" alt="Login" className="login-gif" />

                    <h1>Login Form</h1>

                    <p>Sign in to continue your journey</p>
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
                            Username
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={logindata.username}
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
                                value={logindata.password}
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

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/auth/forgot-password" className="forgot-link">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="material-icons rotating">sync</span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <span className="material-icons">login</span>
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? 
                        <Link to="/auth/register"> Register now</Link>
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

export default Login;

