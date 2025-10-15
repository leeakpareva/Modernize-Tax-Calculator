import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GiftDetails.css';

const GiftDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGift = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3060/api/gifts/${id}`);

                if (!response.ok) {
                    throw new Error('Gift not found');
                }

                const giftData = await response.json();
                setGift(giftData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchGift();
        }
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoToList = () => {
        navigate('/gifts');
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading gift details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error!</h4>
                    <p>{error}</p>
                    <hr />
                    <button className="btn btn-outline-danger" onClick={handleGoBack}>
                        <i className="bi bi-arrow-left me-2"></i>Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!gift) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Gift Not Found</h4>
                    <p>The gift you're looking for doesn't exist.</p>
                    <hr />
                    <button className="btn btn-outline-warning" onClick={handleGoToList}>
                        <i className="bi bi-list me-2"></i>View All Gifts
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    {/* Navigation buttons */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <button className="btn btn-outline-secondary" onClick={handleGoBack}>
                            <i className="bi bi-arrow-left me-2"></i>Back
                        </button>
                        <button className="btn btn-outline-primary" onClick={handleGoToList}>
                            <i className="bi bi-list me-2"></i>All Gifts
                        </button>
                    </div>

                    {/* Gift details card */}
                    <div className="card shadow-lg">
                        <div className="row g-0">
                            {/* Image section */}
                            <div className="col-md-5">
                                <div className="gift-image-container">
                                    {gift.image ? (
                                        <img
                                            src={`http://localhost:3060${gift.image}`}
                                            alt={gift.name}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                            style={{ minHeight: '400px' }}
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center bg-light h-100" style={{ minHeight: '400px' }}>
                                            <i className="bi bi-gift fs-1 text-muted"></i>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Details section */}
                            <div className="col-md-7">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        <h1 className="card-title text-primary mb-2">{gift.name}</h1>
                                        <div className="d-flex gap-2 mb-3">
                                            <span className="badge bg-primary fs-6">
                                                <i className="bi bi-tag-fill me-1"></i>
                                                {gift.category}
                                            </span>
                                            <span className="badge bg-success fs-6">
                                                <i className="bi bi-geo-alt-fill me-1"></i>
                                                {gift.zipcode}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="text-secondary mb-2">
                                            <i className="bi bi-card-text me-2"></i>Description
                                        </h5>
                                        <p className="card-text fs-6 lh-base">{gift.description}</p>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <div className="info-item">
                                                <h6 className="text-muted mb-1">
                                                    <i className="bi bi-hash me-1"></i>Gift ID
                                                </h6>
                                                <p className="mb-0 fw-bold">{gift.id}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="info-item">
                                                <h6 className="text-muted mb-1">
                                                    <i className="bi bi-calendar-date me-1"></i>Date Added
                                                </h6>
                                                <p className="mb-0 fw-bold">
                                                    {gift.createdAt ? new Date(gift.createdAt).toLocaleDateString() : 'Not specified'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="mt-4 pt-3 border-top">
                                        <div className="d-flex gap-2 flex-wrap">
                                            <button className="btn btn-success">
                                                <i className="bi bi-heart-fill me-2"></i>Add to Wishlist
                                            </button>
                                            <button className="btn btn-outline-primary">
                                                <i className="bi bi-share-fill me-2"></i>Share
                                            </button>
                                            <button className="btn btn-outline-secondary">
                                                <i className="bi bi-flag-fill me-2"></i>Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftDetails;