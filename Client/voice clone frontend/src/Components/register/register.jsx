import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    // 1. Separate State Variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');

    const navigate = useNavigate();

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault(); 

        // 2. FIX: Compare variables directly (NOT formData.password)
        if (password !== confirmpassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // 3. FIX: Send the state variables directly
                body: JSON.stringify({
                    email: email,       
                    password: password, 
                    // You can send username too if you update your Flask backend to accept it
                    // username: username 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Registration Successful! Please login.");
                navigate('/login'); 
            } else {
                alert("❌ Error: " + data.error);
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server.");
        }
    };


    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Account</h2>

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username} // FIX: Use 'username' state
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email} // FIX: Use 'email' state
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password} // FIX: Use 'password' state
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmpassword} // FIX: Use 'confirmpassword' state
                            onChange={(e) => setconfirmPassword(e.target.value)}
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