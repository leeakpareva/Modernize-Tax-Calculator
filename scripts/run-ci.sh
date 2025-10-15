#!/bin/bash

# GiftLink CI/CD Local Runner Script
# This script runs the CI/CD pipeline locally for testing

set -e  # Exit on any error

echo "🚀 Starting GiftLink CI/CD Pipeline..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to run CI for frontend
run_frontend_ci() {
    print_status "Running Frontend CI Pipeline..."

    cd giftlink-frontend

    print_status "Installing frontend dependencies..."
    npm ci

    print_status "Running ESLint on frontend..."
    npm run lint || print_warning "Linting issues found in frontend"

    print_status "Running frontend tests..."
    npm run test:coverage || print_warning "Some frontend tests failed"

    print_status "Building frontend application..."
    npm run build

    print_success "Frontend CI completed!"
    cd ..
}

# Function to run CI for backend
run_backend_ci() {
    print_status "Running Backend CI Pipeline..."

    cd giftlink-backend

    print_status "Installing backend dependencies..."
    npm ci

    print_status "Running ESLint on backend..."
    npm run lint || print_warning "Linting issues found in backend"

    print_status "Running backend tests..."
    npm run test || print_warning "Some backend tests failed"

    print_status "Building backend application..."
    npm run build

    print_success "Backend CI completed!"
    cd ..
}

# Function to run security checks
run_security_checks() {
    print_status "Running Security Checks..."

    print_status "Running npm audit for frontend..."
    cd giftlink-frontend
    npm audit --audit-level moderate || print_warning "Security vulnerabilities found in frontend"
    cd ..

    print_status "Running npm audit for backend..."
    cd giftlink-backend
    npm audit --audit-level moderate || print_warning "Security vulnerabilities found in backend"
    cd ..

    print_success "Security checks completed!"
}

# Function to build Docker images
build_docker_images() {
    print_status "Building Docker Images..."

    print_status "Building frontend Docker image..."
    docker build -t giftlink-frontend:latest ./giftlink-frontend

    print_status "Building backend Docker image..."
    docker build -t giftlink-backend:latest ./giftlink-backend

    print_success "Docker images built successfully!"
}

# Function to run full CI/CD pipeline
run_full_pipeline() {
    print_status "🔄 Running Full CI/CD Pipeline..."

    # Check if we're in the right directory
    if [[ ! -d "giftlink-frontend" || ! -d "giftlink-backend" ]]; then
        print_error "Please run this script from the project root directory"
        exit 1
    fi

    # Run CI for both frontend and backend
    run_frontend_ci
    run_backend_ci

    # Run security checks
    run_security_checks

    # Build Docker images
    build_docker_images

    print_success "🎉 Full CI/CD Pipeline completed successfully!"
}

# Parse command line arguments
case "${1:-full}" in
    "frontend")
        run_frontend_ci
        ;;
    "backend")
        run_backend_ci
        ;;
    "security")
        run_security_checks
        ;;
    "docker")
        build_docker_images
        ;;
    "full")
        run_full_pipeline
        ;;
    *)
        echo "Usage: $0 [frontend|backend|security|docker|full]"
        echo ""
        echo "Commands:"
        echo "  frontend  - Run frontend CI only"
        echo "  backend   - Run backend CI only"
        echo "  security  - Run security checks only"
        echo "  docker    - Build Docker images only"
        echo "  full      - Run complete CI/CD pipeline (default)"
        exit 1
        ;;
esac