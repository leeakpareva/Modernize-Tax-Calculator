**As a** user
**I need** a landing page with navigation
**So that** I can easily access different sections of the GiftLink application

### Details and Assumptions
* Landing page should display the GiftLink branding and purpose
* Navigation bar should include links to Home, Gifts, Search, and Login/Profile
* Page should be responsive and work on mobile devices
* Navigation should highlight the current active page

### Acceptance Criteria

```gherkin
Given I am on the GiftLink application
When I access the homepage
Then I should see a welcoming landing page with clear branding
And I should see a navigation bar with all main sections
And when I click on navigation links, I should be taken to the appropriate pages
And the navigation should work on both desktop and mobile devices
```

**Labels:** backlog, enhancement
