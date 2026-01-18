# Initial Concept

I want to build a directory of Agent Skills (https://agentskills.io/). This is an open standard that users of AI platforms can use to hone the skills of their LLM. The directory should have two goals: 1) create a searchable directory. The directory will allow for skills to be submitted with meta information, such as name, description, tags, GitHub repo, etc. Users will submit new additions to the directory by forking it and creating a PR. 2) provide a machine readable list of the extensions, so that other tools can read and discover tools easily. For example, someone may wish to create a CLI tool that allows someone to install an Agent Skill in their local repo. There should be a central JSON file that is used to both render the website and publish the list of Agent Skills for any 3rd party tool to read.

# Product Definition

## 1. Target Audience
The Agent Skills Directory serves three distinct groups:
- **AI Developers & Platform Users:** The primary audience. They use the website to discover and adopt ready-made skills to enhance their LLM workflows.
- **Skill Creators:** Contributors who standardize and share their extensions with the community via Pull Requests.
- **Tool Builders:** Developers who leverage the machine-readable registry to build integrations, CLIs, or IDE plugins. This includes the `skx` CLI ecosystem.

## 2. Core Features
- **Searchable Directory:** A focused, "no-nonsense" website featuring a simple, universal search box and a pre-populated registry of high-quality skills (e.g., Anthropics collections). It queries all relevant fields (name, description, tags) to surface results instantly.
- **Machine-Readable Registry:** A centralized `skills.json` file serves as the single source of truth. This file powers the website and provides a reliable, discoverable endpoint for third-party tools.
- **Contribution Workflow:** A Git-based submission process where users fork the repository and submit PRs.
- **CLI Integration (skx):** Prominent promotion of the `skx` CLI tool as the standard way to manage and install skills directly from the terminal.
- **Schema Validation:** Automated enforcement of the metadata schema to ensure the integrity of the `skills.json` registry.
- **Deep Linking & SEO:** Every skill has a unique, shareable URL (e.g., `/skill/weather-assistant`) with dynamic metadata for rich social media previews.
- **Client-Side Architecture:** The website is a purely static application running entirely in the browser. It requires no server-side code or backend infrastructure.
- **Deployment:** The application is optimized for and deployed on **Netlify**, ensuring high availability and global performance for the static assets.

## 3. Metadata Schema
To ensure quality and interoperability, every skill submission must adhere to a strict schema:
- **Mandatory:** Name, Description, GitHub Repository URL.
- **Optional:** Tags, Author.
- **Validation:** A formal schema definition will be implemented to automatically validate submissions.

## 4. User Experience (UX) & Design
- **Visual Style:** A clean, minimal, and "pretty" interface. It draws inspiration from terminal aesthetics to align with the technical nature of Agent Skills, avoiding unnecessary clutter.
- **Interaction:** Fast, direct access to information. Users should be able to find and copy what they need without navigating through heavy menus.
- **Dynamic Content:** When viewing a skill (via search or selection), the interface will dynamically fetch and display the GitHub star count for that skill's repository directly from the browser.
+- **Interactive Terminal Elements:** The UI incorporates interactive elements like typing animations and one-click "copy-to-clipboard" commands to reinforce the terminal aesthetic and improve utility.
