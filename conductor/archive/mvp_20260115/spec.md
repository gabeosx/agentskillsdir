# Specification: MVP - Searchable Directory & Schema Validation

## Overview
This track focuses on building the core functionality of the Agent Skills Directory. This includes the centralized `skills.json` registry, a Zod-based validation system, and a React-based static website with a terminal-inspired aesthetic.

## Functional Requirements
- **Centralized Registry:** A `skills.json` file containing a list of Agent Skills.
- **Schema Validation:** Automated validation using Zod to ensure all skills have a name, description, and GitHub repository link.
- **Searchable Directory:** A real-time search interface that filters skills by name, description, or tags.
- **Skill Detail View:** A modal or overlay showing the full details of a skill, including its GitHub star count (fetched dynamically).
- **Terminal Aesthetic:** A high-contrast, monospaced UI that mimics a command-line interface.

## Technical Requirements
- **Frontend:** React (Vite) with TypeScript.
- **Styling:** Tailwind CSS for the terminal theme.
- **Data Handling:** Fetching `skills.json` and GitHub API calls (v3) for star counts.
- **Deployment:** Optimized for Cloudflare Pages as a static export.

## Success Criteria
- `skills.json` passes validation with Zod.
- Search box filters the skill list correctly in real-time.
- Clicking a skill opens a modal with the correct data and repository stars.
- The UI adheres to the monospaced, dark-themed terminal aesthetic.
