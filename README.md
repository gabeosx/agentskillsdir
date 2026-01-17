# Agent Skills Directory

A searchable directory and machine-readable registry for LLM skills.
Deployed at [skillindex.dev](https://skillindex.dev).

<a href="https://www.producthunt.com/products/agent-skills-directory-2?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-agent-skills-directory-2" target="_blank" rel="noopener noreferrer"><img alt="Agent Skills Directory - Share and discover skills for your favorite AI agents | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1064211&amp;theme=light&amp;t=1768669132552"></a>

## Project Overview

The Agent Skills Directory serves as a centralized hub for discovering and adopting Agent Skills—standardized tools that enhance LLM workflows. It serves three primary audiences:

-   **AI Developers & Platform Users:** To discover ready-made skills.
-   **Skill Creators:** To share and standardize their extensions.
-   **Tool Builders:** To leverage the machine-readable registry for integrations.

The project features a **Searchable Directory** for easy discovery and a **Machine-Readable Registry** (`skills.json`) that acts as the single source of truth.

## Tech Stack & Architecture

-   **Frontend:** React (Vite) with TypeScript.
-   **Styling:** Tailwind CSS and Lucide React.
-   **Data:** `skills.json` validated by Zod.
-   **Deployment:** Cloudflare Pages.

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/agentskillsdir.git
cd agentskillsdir

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the development server
npm run dev
```

### Building for Production
```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Contributing

We welcome contributions to the Agent Skills Directory!

### Adding a New Skill
1. **Fork** the repository.
2. Add your skill to `public/skills.json`. Ensure it follows the schema (Name, Description, GitHub URL are mandatory).
3. **Validate** your changes:
   ```bash
   npm run validate-skills
   ```
4. **Submit a Pull Request** with a brief description of the skill.

## License

This project is licensed under the MIT License.