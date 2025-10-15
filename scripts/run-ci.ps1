# GiftLink CI/CD Local Runner Script (PowerShell)
# This script runs the CI/CD pipeline locally for testing

param(
    [string]$Command = "full"
)

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Function to run CI for frontend
function Run-FrontendCI {
    Write-Status "Running Frontend CI Pipeline..."

    Set-Location "fullstack-capstone-project/giftlink-frontend"

    Write-Status "Installing frontend dependencies..."
    npm ci
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install frontend dependencies"; exit 1 }

    Write-Status "Running ESLint on frontend..."
    npm run lint
    if ($LASTEXITCODE -ne 0) { Write-Warning "Linting issues found in frontend" }

    Write-Status "Running frontend tests..."
    npm run test:coverage
    if ($LASTEXITCODE -ne 0) { Write-Warning "Some frontend tests failed" }

    Write-Status "Building frontend application..."
    npm run build
    if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed"; exit 1 }

    Write-Success "Frontend CI completed!"
    Set-Location "../.."
}

# Function to run CI for backend
function Run-BackendCI {
    Write-Status "Running Backend CI Pipeline..."

    Set-Location "fullstack-capstone-project/giftlink-backend"

    Write-Status "Installing backend dependencies..."
    npm ci
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to install backend dependencies"; exit 1 }

    Write-Status "Running ESLint on backend..."
    npm run lint
    if ($LASTEXITCODE -ne 0) { Write-Warning "Linting issues found in backend" }

    Write-Status "Running backend tests..."
    npm run test
    if ($LASTEXITCODE -ne 0) { Write-Warning "Some backend tests failed" }

    Write-Status "Building backend application..."
    npm run build
    if ($LASTEXITCODE -ne 0) { Write-Error "Backend build failed"; exit 1 }

    Write-Success "Backend CI completed!"
    Set-Location "../.."
}

# Function to run security checks
function Run-SecurityChecks {
    Write-Status "Running Security Checks..."

    Write-Status "Running npm audit for frontend..."
    Set-Location "fullstack-capstone-project/giftlink-frontend"
    npm audit --audit-level moderate
    if ($LASTEXITCODE -ne 0) { Write-Warning "Security vulnerabilities found in frontend" }
    Set-Location "../.."

    Write-Status "Running npm audit for backend..."
    Set-Location "fullstack-capstone-project/giftlink-backend"
    npm audit --audit-level moderate
    if ($LASTEXITCODE -ne 0) { Write-Warning "Security vulnerabilities found in backend" }
    Set-Location "../.."

    Write-Success "Security checks completed!"
}

# Function to build Docker images
function Build-DockerImages {
    Write-Status "Building Docker Images..."

    # Check if Docker is available
    try {
        docker --version | Out-Null
    }
    catch {
        Write-Error "Docker is not installed or not available in PATH"
        return
    }

    Write-Status "Building frontend Docker image..."
    docker build -t giftlink-frontend:latest ./fullstack-capstone-project/giftlink-frontend
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to build frontend Docker image"; exit 1 }

    Write-Status "Building backend Docker image..."
    docker build -t giftlink-backend:latest ./fullstack-capstone-project/giftlink-backend
    if ($LASTEXITCODE -ne 0) { Write-Error "Failed to build backend Docker image"; exit 1 }

    Write-Success "Docker images built successfully!"
}

# Function to run full CI/CD pipeline
function Run-FullPipeline {
    Write-Status "🔄 Running Full CI/CD Pipeline..."

    # Check if we're in the right directory
    if (-not (Test-Path "fullstack-capstone-project/giftlink-frontend") -or -not (Test-Path "fullstack-capstone-project/giftlink-backend")) {
        Write-Error "Please run this script from the project root directory"
        exit 1
    }

    # Run CI for both frontend and backend
    Run-FrontendCI
    Run-BackendCI

    # Run security checks
    Run-SecurityChecks

    # Build Docker images
    Build-DockerImages

    Write-Success "🎉 Full CI/CD Pipeline completed successfully!"
}

# Main script logic
Write-Host "🚀 Starting GiftLink CI/CD Pipeline..." -ForegroundColor Cyan

switch ($Command.ToLower()) {
    "frontend" {
        Run-FrontendCI
    }
    "backend" {
        Run-BackendCI
    }
    "security" {
        Run-SecurityChecks
    }
    "docker" {
        Build-DockerImages
    }
    "full" {
        Run-FullPipeline
    }
    default {
        Write-Host "Usage: .\scripts\run-ci.ps1 [frontend|backend|security|docker|full]" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Commands:"
        Write-Host "  frontend  - Run frontend CI only"
        Write-Host "  backend   - Run backend CI only"
        Write-Host "  security  - Run security checks only"
        Write-Host "  docker    - Build Docker images only"
        Write-Host "  full      - Run complete CI/CD pipeline (default)"
        exit 1
    }
}