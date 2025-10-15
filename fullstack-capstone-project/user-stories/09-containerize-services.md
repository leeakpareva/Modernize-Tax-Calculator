**As a** developer
**I need** to containerize the backend and frontend services using Docker
**So that** the application can be easily deployed and run in any environment

### Details and Assumptions
* Create Dockerfile for backend Express application
* Create Dockerfile for frontend React application
* Create docker-compose.yml for orchestrating all services including MongoDB
* Images should be optimized for production
* Environment variables should be properly configured

### Acceptance Criteria

```gherkin
Given I have Docker installed
When I run docker-compose up
Then all services (frontend, backend, database) should start successfully
And the services should be able to communicate with each other
And the application should be fully functional
And I should be able to access the application from my browser

Given I make changes to the code
When I rebuild the Docker images
Then the changes should be reflected in the running containers
```

**Labels:** icebox, enhancement
