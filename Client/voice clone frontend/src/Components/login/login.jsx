import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom'; 

export default function Login() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const navigate = useNavigate(); //it is used because if we use link it will directly move to the next page instead of waiting for the response, so we use it

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json", //it tells the flask what type of data is being send so that it can use request.get_json() otherwise it will give none
                },
                body: JSON.stringify({
                    email:Email,
                    password: Password,
                }),
            });
            const data = await response.json();

           if (response.ok) {
                alert(" LOGIN Successful!!");
                sessionStorage.setItem("user_id", data.user_id);
                navigate('/');
                window.location.reload();
            } else {
                alert("Error: " + data.error);
            }
        }catch (error) {
            console.error("Error:", error);
            alert("Failed to connect to the server.");
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                
                <form onSubmit={handleLogin} >
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your email"
                            value={Email}
                            onChange={(e)=> setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            id="password"
                            placeholder="Enter your password"
                            value={Password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="signup-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
}