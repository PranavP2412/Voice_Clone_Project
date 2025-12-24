import React, { useState, useEffect } from "react";
import Header from "./Components/header/header";
import Footer from "./Components/footer/footer";
import { Outlet } from "react-router-dom";



function App() {
    const [UserId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = sessionStorage.getItem("user_id");

        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("user_id"); // Clear session
        setUserId(null);
        window.location.reload();
    }

    return (
        <>
            <Header userId={UserId} logout={handleLogout} />
            <Outlet />
            <Footer />
        </>
    )
}

export default App;