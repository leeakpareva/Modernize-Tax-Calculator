**As a** developer
**I need** to initialize and populate MongoDB with sample data
**So that** the application has a working database to store and retrieve gift information

### Details and Assumptions
* MongoDB needs to be set up locally or in the cloud
* Database should include collections for users, gifts, and comments
* Sample data should include at least 10-15 gift items for testing
* Connection string should be configured in environment variables

### Acceptance Criteria

```gherkin
Given the MongoDB database is installed and accessible
When I run the initialization script
Then the database should be created with all necessary collections
And sample data should be populated in each collection
And the connection should be verifiable through the application
```

**Labels:** backlog, enhancement
