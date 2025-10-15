**As a** developer
**I need** to run the skeleton application with basic routing
**So that** I can verify the project structure and basic connectivity between frontend and backend

### Details and Assumptions
* Backend should have basic Express server running
* Frontend should have basic React app running
* Both services should be able to communicate
* Basic health check endpoints should be available

### Acceptance Criteria

```gherkin
Given the skeleton application code is available
When I start both the backend and frontend servers
Then both servers should start without errors
And the frontend should be accessible in the browser
And the frontend should successfully call a backend health check endpoint
```

**Labels:** backlog, enhancement
