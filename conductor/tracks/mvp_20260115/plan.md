# Implementation Plan: MVP - Searchable Directory & Schema Validation

## Phase 1: Project Scaffolding & Registry Setup
- [x] Task: Initialize React (Vite) project with TypeScript and Tailwind CSS [add1ff9]
    - [x] Run Vite scaffold command [add1ff9]
    - [x] Configure Tailwind with monospaced fonts and terminal colors [add1ff9]
- [x] Task: Define the Zod schema and initial `skills.json` [ffbf02e]
    - [x] Write Zod schema for skill metadata [ffbf02e]
    - [x] Create a sample `skills.json` with initial data [ffbf02e]
    - [x] Implement a validation script (TDD: Write test to verify schema) [ffbf02e]
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Scaffolding & Registry Setup' (Protocol in workflow.md)

## Phase 2: Core UI & Search Implementation
- [ ] Task: Implement the main layout and Terminal-themed Search Box
    - [ ] Write tests for search filtering logic
    - [ ] Build the layout shell and search component
- [ ] Task: Implement the Skill List and real-time filtering
    - [ ] Write tests for list rendering and filtering
    - [ ] Build the skill card/row components
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core UI & Search Implementation' (Protocol in workflow.md)

## Phase 3: Detail View & Dynamic Data
- [ ] Task: Implement the Skill Detail Modal
    - [ ] Write tests for modal open/close and data display
    - [ ] Build the modal component
- [ ] Task: Integrate GitHub Stars fetching
    - [ ] Write tests for the GitHub API service (mocking fetch)
    - [ ] Implement browser-side star count fetching with caching
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Detail View & Dynamic Data' (Protocol in workflow.md)

## Phase 4: Final Polishing & Deployment Prep
- [ ] Task: Final aesthetic refinements and accessibility check
    - [ ] Apply final terminal-themed UI tweaks (ASCII art, scanlines)
    - [ ] Ensure full keyboard navigability
- [ ] Task: Configure Cloudflare Pages deployment
    - [ ] Add deployment script and configuration
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Polishing & Deployment Prep' (Protocol in workflow.md)
