# Specification: Populate Directory with Initial Skills

## Overview
This track involves populating the `skills.json` registry with a comprehensive set of initial skills sourced from reputable open-source repositories. This will transform the empty (or sample-only) directory into a useful resource for users immediately.

## Sources
1.  **Anthropics Skills Collection:**
    -   **Source:** `https://github.com/anthropics/skills/tree/main/skills`
    -   **Strategy:** Treat each subdirectory within the `skills/` folder as a distinct skill entry.
2.  **Apple Container Skill:**
    -   **Source:** `https://github.com/gabeosx/apple-container-skill`
    -   **Strategy:** Add as a single skill entry.

## Functional Requirements
-   **Data Extraction:** For each skill, extract the following metadata to populate `skills.json`:
    -   **Name:** Derived from the folder name or the `README.md` title (formatted nicely).
    -   **Description:** Extracted from the `README.md` introduction or repository description.
    -   **URL:** The full GitHub URL pointing to the specific skill's location (e.g., deep link for monorepo skills).
    -   **Tags:** Inferred from context or manually assigned (e.g., "python", "anthropic", "tool").
-   **Schema Compliance:** Ensure all added entries strictly validate against the existing Zod schema (in `src/schemas/skill.ts`).
-   **Cleanup:** Remove any temporary placeholder data currently in `skills.json`.

## Success Criteria
-   All skills from the Anthropics `skills/` directory are present in `skills.json`.
-   The `apple-container-skill` is present in `skills.json`.
-   The `skills.json` file passes the `npm run validate-skills` check.
-   The application builds and renders the new list correctly.
