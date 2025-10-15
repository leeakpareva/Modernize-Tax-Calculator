**As a** user
**I need** to comment on gift listings
**So that** I can ask questions or provide feedback about gifts

### Details and Assumptions
* Comments should be visible on the gift details page
* Only authenticated users should be able to post comments
* Comments should display username and timestamp
* Users should be able to edit or delete their own comments
* Comments should be stored in MongoDB with reference to the gift

### Acceptance Criteria

```gherkin
Given I am an authenticated user viewing a gift details page
When I enter text in the comment box and submit
Then my comment should appear below the gift details
And my comment should show my username and timestamp
And other users should be able to see my comment

Given I have previously posted a comment
When I view that comment
Then I should see edit and delete options
And when I click edit, I should be able to modify my comment
And when I click delete, my comment should be removed after confirmation
```

**Labels:** backlog, enhancement
