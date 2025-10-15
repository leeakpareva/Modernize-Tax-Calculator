**As a** user
**I need** to view detailed information about a gift
**So that** I can learn more about gifts that interest me before making a decision

### Details and Assumptions
* Details page should display gift name, image, description, category, and condition
* Page should show price or value information
* Should display contact information or link to contact the gift owner
* Page should be accessible via a unique URL for sharing
* Images should load properly and be optimized

### Acceptance Criteria

```gherkin
Given I am browsing gifts on the application
When I click on a specific gift
Then I should be taken to a details page for that gift
And I should see all relevant information about the gift
And I should see high-quality images of the gift
And I should have the option to contact the owner or express interest

Given I receive a direct link to a gift details page
When I open the link
Then I should see the complete details of that specific gift
```

**Labels:** backlog, enhancement
