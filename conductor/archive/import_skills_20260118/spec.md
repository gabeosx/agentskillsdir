# Specification: Import and Validate Skills from CSV (Agent Execution)

## 1. Overview
This track defines a workflow where the AI Agent directly processes a `tmp.csv` file to import, validate, and register new Agent Skills into `public/skills.json`. No permanent script or CLI tool will be created.

## 2. Input Data (`tmp.csv`)
- **Format:** CSV
- **Columns:** `packageName`, `description`, `githubRepoUrl`
- **Link Format:** The `githubRepoUrl` in the CSV links directly to `SKILL.md`.

## 3. Execution Steps (Agent Actions)

### 3.1 Data Loading
- **Action:** Read `tmp.csv` and `public/skills.json`.
- **Parsing:** Agent parses the CSV data and existing JSON registry.

### 3.2 Validation & Uniqueness
- **Uniqueness Check:** Compare CSV entries against the existing registry.
  - Skip if `packageName` matches.
  - Skip if the *directory* URL matches.
- **Deep Validation (URL Check):**
  - **Action:** Use `run_shell_command` (e.g., `curl -I -f <url>`) to verify the `githubRepoUrl` is reachable (HTTP 200).
  - **Constraint:** Skip any entry that returns a 404 or connection error.

### 3.3 Transformation & Sanitization
- **URL Transformation:** Strip `/SKILL.md` (case-insensitive) from the valid `githubRepoUrl` to get the directory URL.
- **Package Name Sanitization:** Convert `packageName` to strict kebab-case (e.g., "My Skill" -> `my-skill`).
- **Name Generation:** Convert sanitized `packageName` to Title Case (e.g., "my-skill" -> "My Skill") for the human-readable Name.
- **Tag Generation:** Heuristically generate tags based on keywords found in the `packageName` and `description` (e.g., "docker", "pdf", "anthropic", "cli").

### 3.4 Registry Update
- **Action:** Construct the new JSON objects.
- **Action:** Merge new objects with the existing array.
- **Action:** Overwrite `public/skills.json` with the formatted, updated list.

### 3.5 Reporting
- **Output:** Provide a final summary in the chat, detailing:
  - Number of skills added.
  - List of skipped duplicates.
  - List of skipped invalid URLs.
  - Specific sanitizations applied (e.g., "Renamed 'My Skill' to 'my-skill'").

## 4. Acceptance Criteria
- [ ] `public/skills.json` contains the new, valid entries.
- [ ] No invalid URLs (404s) are added.
- [ ] No duplicate packages are added.
- [ ] All URLs in the registry point to directories, not `SKILL.md` files.
- [ ] A clear summary of the operation is provided to the user.
