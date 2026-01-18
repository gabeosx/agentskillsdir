# Specification - SEO Optimization and Deep Linking

## Overview
This track focuses on optimizing the Agent Skills Directory for search engines (SEO) and social media platforms. By implementing deep linking (individual URLs for skills), dynamic metadata, and a robust social card strategy, we aim to improve discoverability for queries like "pdf claude skill" or "gemini skills."

## Functional Requirements
- **Deep Linking:** Implement path-based routing (e.g., `/skill/pdf-helper`) using the browser's History API.
- **Netlify Redirection:** Configure a `_redirects` file to ensure all paths resolve to `index.html`, allowing the React application to handle routing.
- **Dynamic Metadata:** Integrate `react-helmet-async` to dynamically update the page title and meta description based on the skill being viewed.
- **Netlify Prerendering:** Ensure compatibility with Netlify's prerendering service for bot/crawler visibility.
- **Social Metadata (Open Graph/Twitter):** Implement meta tags for high-quality previews on Twitter, LinkedIn, and Facebook.
- **Automated SEO Assets:**
    - Create a build-time script to generate `sitemap.xml` containing all individual skill URLs from `skills.json`.
    - Create a build-time script to generate `robots.txt` that points to the sitemap.

## Non-Functional Requirements
- **Performance:** Ensure routing logic does not introduce significant latency.
- **SEO Best Practices:** Use semantic HTML and ensure primary keywords are present in the DOM.

## Acceptance Criteria
- [ ] Navigating directly to a skill URL (e.g., `/skill/name`) opens that specific skill's detail view.
- [ ] Browser tab title and meta description update dynamically when a skill is selected.
- [ ] Social media previews display the specific skill's title/description (tested via validators).
- [ ] `sitemap.xml` and `robots.txt` are correctly generated and accessible after a build.
- [ ] Search engines can crawl the individual skill paths listed in the sitemap.

## Out of Scope
- Dynamic generation of unique social card images per skill (using a single high-quality branded card).
- Server-Side Rendering (SSR) migration.
