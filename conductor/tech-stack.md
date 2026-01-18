# Technology Stack

## 1. Frontend Framework
- **React (Vite):** A lightweight, fast-loading Single Page Application (SPA) architecture.
- **TypeScript:** For type safety across the application and the `skills.json` schema.
- **React Router:** Handles client-side routing and deep linking.
- **React Helmet Async:** Manages dynamic document head tags (title, meta description) for SEO.

## 2. Styling & UI
- **Tailwind CSS:** Utilized for rapid, utility-first styling to achieve the terminal-inspired aesthetic (monospaced fonts, high-contrast colors, sharp borders).
- **Lucide React:** For minimalist, high-quality icons.

## 3. Data & Schema Validation
- **JSON (skills.json):** The central, machine-readable registry and single source of truth.
- **Zod:** Used for defining the metadata schema and validating the `skills.json` file during both development and CI/CD processes.

## 4. External Integrations
- **GitHub REST API (v3):** Fetched directly from the browser to display real-time repository star counts. Local caching/error handling will be implemented to manage GitHub's unauthenticated rate limits.

## 5. Deployment & Infrastructure
- **Netlify:** For global, high-performance hosting of the static assets.
- **GitHub Actions:** To automate the schema validation of `skills.json` on every Pull Request.
