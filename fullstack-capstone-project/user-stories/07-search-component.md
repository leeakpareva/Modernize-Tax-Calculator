**As a** user
**I need** to search for gifts by keywords or categories
**So that** I can quickly find gifts that match my interests

### Details and Assumptions
* Search should work on gift name, description, and category
* Search should return results in real-time or with minimal delay
* Results should be displayed in a clear, organized format
* Should handle empty results gracefully
* Filter options should include category, condition, and location

### Acceptance Criteria

```gherkin
Given I am on the search page
When I enter a keyword in the search box
Then I should see a list of gifts matching that keyword
And the results should update as I type
And the results should include relevant gift information

Given I apply filters to my search
When I select a category or condition filter
Then the results should update to show only matching gifts
And I should be able to combine multiple filters
And I should be able to clear filters to see all results again
```

**Labels:** backlog, enhancement
