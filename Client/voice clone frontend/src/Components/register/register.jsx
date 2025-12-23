import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';

export default function Register() {


    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Create Account</h1>
                
                <form action={'/register'}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                        />
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button type="submit" className="register-btn">Register</button>
                </form>

                <p className="login-link">
                    Already have an account? <Link to={'/login'}>Login here</Link>
                </p>
            </div>
        </div>
    );
}