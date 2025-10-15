import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GiftList.css';

const GiftList = () => {
    const navigate = useNavigate();
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredGifts, setFilteredGifts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3060/api/gifts');

                if (!response.ok) {
                    throw new Error('Failed to fetch gifts');
                }

                const giftsData = await response.json();
                setGifts(giftsData);
                setFilteredGifts(giftsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGifts();
    }, []);

    useEffect(() => {
        let filtered = gifts;

        if (searchTerm) {
            filtered = filtered.filter(gift =>
                gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gift.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter !== 'all') {
            filtered = filtered.filter(gift =>
                gift.category.toLowerCase() === categoryFilter.toLowerCase()
            );
        }

        setFilteredGifts(filtered);
    }, [searchTerm, categoryFilter, gifts]);

    const handleGiftClick = (giftId) => {
        navigate(`/gifts/${giftId}`);
    };

    const getUniqueCategories = () => {
        const categories = gifts.map(gift => gift.category);
        return [...new Set(categories)];
    };

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading gifts...</p>
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
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="text-primary">
                            <i className="bi bi-gift-fill me-2"></i>
                            All Gifts
                        </h1>
                        <span className="badge bg-primary fs-6">
                            {filteredGifts.length} gift{filteredGifts.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="row g-3">
                                {/* Search */}
                                <div className="col-md-4">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-search"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search gifts..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="col-md-4">
                                    <select
                                        className="form-select"
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    >
                                        <option value="all">All Categories</option>
                                        {getUniqueCategories().map(category => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* View Mode Toggle */}
                                <div className="col-md-4">
                                    <div className="btn-group w-100" role="group">
                                        <button
                                            type="button"
                                            className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setViewMode('grid')}
                                        >
                                            <i className="bi bi-grid-3x3-gap me-1"></i>Grid
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setViewMode('list')}
                                        >
                                            <i className="bi bi-list-ul me-1"></i>List
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            {filteredGifts.length === 0 ? (
                <div className="text-center py-5">
                    <i className="bi bi-search display-1 text-muted"></i>
                    <h3 className="text-muted mt-3">No gifts found</h3>
                    <p className="text-muted">Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? 'row g-4' : ''}>
                    {filteredGifts.map((gift) => (
                        viewMode === 'grid' ? (
                            /* Grid View */
                            <div key={gift.id || gift._id} className="col-lg-4 col-md-6 col-sm-12">
                                <div className="card h-100 gift-card shadow-sm" onClick={() => handleGiftClick(gift.id)}>
                                    <div className="gift-image-container">
                                        {gift.image ? (
                                            <img
                                                src={`http://localhost:3060${gift.image}`}
                                                alt={gift.name}
                                                className="card-img-top"
                                            />
                                        ) : (
                                            <div className="placeholder-image d-flex align-items-center justify-content-center">
                                                <i className="bi bi-gift fs-1 text-muted"></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-primary">{gift.name}</h5>
                                        <p className="card-text text-muted flex-grow-1">
                                            {truncateText(gift.description, 100)}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="badge bg-primary">{gift.category}</span>
                                                <small className="text-muted">
                                                    <i className="bi bi-geo-alt-fill me-1"></i>
                                                    {gift.zipcode}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* List View */
                            <div key={gift.id || gift._id} className="mb-3">
                                <div className="card gift-card-list shadow-sm" onClick={() => handleGiftClick(gift.id)}>
                                    <div className="row g-0">
                                        <div className="col-md-3">
                                            <div className="gift-image-container-list">
                                                {gift.image ? (
                                                    <img
                                                        src={`http://localhost:3060${gift.image}`}
                                                        alt={gift.name}
                                                        className="img-fluid w-100 h-100 object-fit-cover"
                                                    />
                                                ) : (
                                                    <div className="placeholder-image-list d-flex align-items-center justify-content-center h-100">
                                                        <i className="bi bi-gift fs-2 text-muted"></i>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="card-title text-primary mb-0">{gift.name}</h5>
                                                    <div className="d-flex gap-2">
                                                        <span className="badge bg-primary">{gift.category}</span>
                                                        <span className="badge bg-success">
                                                            <i className="bi bi-geo-alt-fill me-1"></i>
                                                            {gift.zipcode}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="card-text text-muted">
                                                    {truncateText(gift.description, 200)}
                                                </p>
                                                <small className="text-muted">
                                                    <i className="bi bi-hash me-1"></i>ID: {gift.id}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default GiftList;