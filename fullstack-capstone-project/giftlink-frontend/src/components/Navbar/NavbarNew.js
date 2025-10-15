import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const userDataString = localStorage.getItem('user');
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        if (userDataString && token) {
            try {
                const userData = JSON.parse(userDataString);
                setUser(userData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        // Listen for storage changes to update navbar when user logs in/out
        const handleStorageChange = () => {
            const updatedUserData = localStorage.getItem('user');
            const updatedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

            if (updatedUserData && updatedToken) {
                try {
                    const userData = JSON.parse(updatedUserData);
                    setUser(userData);
                } catch (error) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also listen for custom event for same-tab updates
        window.addEventListener('userLogin', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userLogin', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        sessionStorage.removeItem('authToken');
        setUser(null);

        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold text-primary" href="/">
                    <i className="bi bi-gift-fill me-2"></i>GiftLink
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                <i className="bi bi-house-door me-1"></i>Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/app">
                                <i className="bi bi-house-heart me-1"></i>Dashboard
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/gifts">
                                <i className="bi bi-gift me-1"></i>Browse Gifts
                            </a>
                        </li>
                    </ul>

                    {/* User info section on the right */}
                    <div className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            <div className="d-flex align-items-center">
                                <span className="navbar-text me-3">
                                    <i className="bi bi-person-circle fs-5 me-2 text-primary"></i>
                                    Welcome, <strong className="text-primary">{user.firstName || user.email}</strong>
                                </span>
                                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-1"></i>Logout
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <a className="btn btn-outline-primary btn-sm" href="/login">
                                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                                </a>
                                <a className="btn btn-primary btn-sm" href="/register">
                                    <i className="bi bi-person-plus-fill me-1"></i>Register
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}