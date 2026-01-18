# Specification - Highlight skx CLI and provide installation syntax

## Overview
Promote the `skx` CLI tool (https://github.com/gabeosx/skx) as the preferred way to manage agent skills. This involves adding a prominent highlight on the homepage and providing easy-to-use installation commands for each skill within their respective detail modals.

## Functional Requirements
- **Homepage Highlight:**
    - Add a "Easily manage your agent skills with skx" call-to-action in the Hero section of the homepage.
    - **Dynamic Typing Animation:** Display a terminal-like effect that simulates typing `skx install <packageName>`. It should rotate through different package names (e.g., `weather-assistant`, `conductor-agent`), backspacing and retyping them.
    - The highlight should link to the `skx` GitHub repository: `https://github.com/gabeosx/skx`.
- **Skill Modal Integration:**
    - Display the `skx` installation command for the selected skill.
    - Command format: `skx install <packageName>`.
    - Provide a "Copy" button next to the command to copy it to the clipboard.
    - The UI should be consistent with the terminal-inspired aesthetic of the site.

## Non-Functional Requirements
- **Performance:** Adding these elements should not negatively impact the initial load time or search responsiveness.
- **UX:** The "Copy" action should provide visual feedback (e.g., "Copied!").
- **Accessibility:** Ensure the highlight link and copy button are accessible via keyboard and screen readers.

## Acceptance Criteria
- [ ] A visible link/highlight for `skx` appears in the hero section of the homepage.
- [ ] Clicking the homepage highlight opens the `skx` GitHub page.
- [ ] Every skill modal displays a section with the text `skx install <packageName>`.
- [ ] Clicking the copy button in the modal copies the command to the clipboard.
- [ ] Visual feedback is shown after copying.

## Out of Scope
- Implementing any server-side features.
- Deep integration with `skx` (e.g., checking if it's installed).
- Detailed documentation of `skx` within the directory.
