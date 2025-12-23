import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom'; 

export default function Login() {

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                
                <form action={'/login'} method='POST' >
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            id="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}