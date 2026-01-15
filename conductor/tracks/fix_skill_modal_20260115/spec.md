# Track: Fix Skill Detail Modal

## Overview
The modal window responsible for displaying detailed information about an Agent Skill is currently non-functional. Clicking on a skill card within the directory does not trigger the modal to open as expected. This track focuses on identifying the root cause and restoring this functionality to ensure users can access skill details.

## Functional Requirements
- **Trigger:** Clicking anywhere on a skill card (title, body, etc.) must open the detail modal.
- **Content:** The modal must display the full details of the selected skill, consistent with the project's metadata schema and product definition:
    - Skill Name
    - Full Description
    - Tags
    - Author
    - GitHub Repository URL
    - Live GitHub Star Count (dynamically fetched)
- **Closure:** Users must be able to close the modal (e.g., via a close button or clicking outside the modal content).

## Non-Functional Requirements
- **Performance:** The modal should open instantly. GitHub star counts should fetch asynchronously without blocking the UI.
- **Responsiveness:** The modal must be fully responsive and usable on mobile devices.
- **Accessibility:** The modal trigger and the modal itself must be accessible (keyboard navigation, focus management).

## Acceptance Criteria
- [ ] Clicking any part of a skill card opens the detail modal.
- [ ] The modal correctly populates with the data of the clicked skill.
- [ ] The modal displays the GitHub star count fetched from the API.
- [ ] The modal can be closed.
- [ ] No console errors are generated during this interaction.

## Out of Scope
- Redesigning the card layout (unless necessary for the click target).
- Changing the data schema.
