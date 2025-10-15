**As a** user
**I need** to register and log in to the application
**So that** I can access personalized features and manage my gift listings

### Details and Assumptions
* Users should be able to register with email and password
* Users should be able to log in with their credentials
* Passwords should be securely hashed
* JWT tokens should be used for session management
* Protected routes should redirect unauthenticated users to login

### Acceptance Criteria

```gherkin
Given I am a new user
When I fill out the registration form with valid information
Then my account should be created successfully
And I should be logged in automatically
And my password should be securely hashed in the database

Given I am a registered user
When I enter my correct credentials on the login page
Then I should be logged in successfully
And I should receive a JWT token
And I should be redirected to the main application
```

**Labels:** backlog, enhancement
