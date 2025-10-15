import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {urlConfig} from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Task 1: Write async fetch operation
        const fetchGifts = async () => {
            try {
                const response = await fetch('http://localhost:3060/api/gifts');
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error('Error fetching gifts:', error);
            }
        };

        fetchGifts();
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate(`/gifts/${productId}`);
    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString();
    };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-4">
                    <h1 className="text-center">Available Gifts</h1>
                    <p className="text-center text-muted">Discover amazing gifts shared by our community</p>
                </div>
                {gifts.length === 0 ? (
                    <div className="col-12 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading gifts...</p>
                    </div>
                ) : (
                    gifts.map((gift) => (
                        <div key={gift.id} className="col-md-4 mb-4">
                            <div className="card product-card h-100">
                                <img
                                    src={gift.image ? `http://localhost:3060${gift.image}` : 'https://via.placeholder.com/300x200?text=No+Image'}
                                    className="card-img-top"
                                    alt={gift.name}
                                    style={{height: '200px', objectFit: 'cover'}}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                    }}
                                />

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{gift.name}</h5>
                                    <p className="card-text flex-grow-1">{gift.description}</p>

                                    <p className={`card-text ${getConditionClass(gift.condition)}`}>
                                        Condition: {gift.condition}
                                    </p>

                                    <p className="card-text">
                                        <small className="text-muted">
                                            Posted by: {gift.posted_by} | Added: {formatDate(gift.date_added)}
                                        </small>
                                    </p>

                                    <p className="card-text">
                                        <small className="text-muted">
                                            Category: {gift.category} | ZIP: {gift.zipcode}
                                        </small>
                                    </p>

                                    <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary mt-auto">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MainPage;
