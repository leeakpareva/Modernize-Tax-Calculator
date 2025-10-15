# GiftLink User Stories - Setup Guide

This directory contains all the user stories for the GiftLink Capstone Project.

## Step 1: Create Labels in GitHub

Go to: `https://github.com/leeakpareva/fullstack-capstone-project/labels`

Create the following labels:

### Priority Labels:
1. **new** - Stories that need to be prioritized
   - Color: `#0E8A16` (green)

2. **backlog** - Stories picked up in the current sprint
   - Color: `#FBCA04` (yellow)

3. **icebox** - Stories to work on later
   - Color: `#BFD4F2` (light blue)

### Type Labels:
4. **enhancement** - Features that bring value to customers
   - Color: `#A2EEEF` (cyan)

5. **technical debt** - Developer tasks with no visible customer value
   - Color: `#D4C5F9` (purple)

## Step 2: Create Issues from User Stories

For each file in this directory (01-10), create a new issue in GitHub:

1. Go to: `https://github.com/leeakpareva/fullstack-capstone-project/issues/new`
2. Select "User Story" template
3. Copy the content from each markdown file
4. Apply the labels specified at the bottom of each story
5. Click "Submit new issue"

## Step 3: Label Prioritization

### Backlog (Work on immediately):
- 01-initialize-mongodb.md - `backlog`, `enhancement`
- 02-skeleton-application.md - `backlog`, `enhancement`
- 03-landing-page-navigation.md - `backlog`, `enhancement`
- 04-research-authentication.md - `backlog`, `technical debt`
- 05-authentication-implementation.md - `backlog`, `enhancement`
- 06-gifts-details-page.md - `backlog`, `enhancement`
- 07-search-component.md - `backlog`, `enhancement`
- 08-comments-feature.md - `backlog`, `enhancement`

### Icebox (Work on later):
- 09-containerize-services.md - `icebox`, `enhancement`
- 10-deploy-application.md - `icebox`, `enhancement`

## Summary

- **Total Stories:** 10
- **Backlog Stories:** 8
- **Icebox Stories:** 2
- **Enhancement Stories:** 9
- **Technical Debt Stories:** 1

## Notes

- The "research authentication" story (04) is labeled as technical debt because it's research work that doesn't directly provide customer value but is necessary for implementation.
- Stories 09 and 10 (containerization and deployment) are in the icebox because they're needed later in the project lifecycle.
- All other stories provide direct customer value and are labeled as enhancements.
