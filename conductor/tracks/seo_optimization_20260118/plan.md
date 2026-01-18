# Implementation Plan - SEO Optimization and Deep Linking

This plan outlines the steps to implement path-based routing, dynamic metadata, and automated SEO asset generation to improve the discoverability of the Agent Skills Directory.

## Phase 1: Routing & Deep Linking Infrastructure
- [x] Task: Install and Configure React Router (419eccd)
    - [x] Install `react-router-dom`.
    - [x] Update `main.tsx` to wrap the App in `BrowserRouter`.
- [x] Task: Implement Path-Based Routing (TDD Red) (6d66f50)
    - [x] Create `src/App.test.tsx` (or update existing) to test that navigating to `/skill/pdf` renders the PDF skill detail.
    - [x] Verify the test fails because routing is not yet implemented.
- [x] Task: Implement Path-Based Routing (TDD Green) (7406a41)
    - [x] Refactor `App.tsx` to use `Routes` and `Route`.
    - [x] Implement a route for `/skill/:packageName` that opens the Skill Modal.
    - [x] Ensure the home route `/` handles the search and list view correctly.
    - [x] Verify the tests pass.
- [x] Task: Configure Netlify Redirects (934c240)
    - [x] Create a `public/_redirects` file with the rule: `/* /index.html 200`.
    - [x] Verify the file is included in the build output.
- [ ] Task: Conductor - User Manual Verification 'Routing & Deep Linking Infrastructure' (Protocol in workflow.md)

## Phase 2: Dynamic Metadata & Social Tags
- [ ] Task: Install and Setup React Helmet
    - [ ] Install `react-helmet-async`.
    - [ ] Add `HelmetProvider` to `main.tsx`.
- [ ] Task: Implement Dynamic Title and Meta Tags (TDD Red)
    - [ ] Create a test that asserts the `<title>` and `<meta name="description">` change when a skill is selected.
    - [ ] Verify the test fails.
- [ ] Task: Implement Dynamic Title and Meta Tags (TDD Green)
    - [ ] Integrate `Helmet` into the skill detail view/modal.
    - [ ] Use skill name for the title and description for the meta tag.
    - [ ] Verify the tests pass.
- [ ] Task: Global Social Metadata
    - [ ] Update `index.html` with base Open Graph and Twitter tags.
    - [ ] Add a high-quality branded social card image to `public/`.
- [ ] Task: Conductor - User Manual Verification 'Dynamic Metadata & Social Tags' (Protocol in workflow.md)

## Phase 3: Automated SEO Assets Generation
- [ ] Task: Create Sitemap and Robots Script (TDD Red)
    - [ ] Create a test for a new script `scripts/generate-seo-assets.ts`.
    - [ ] Assert that it generates a valid `sitemap.xml` based on `public/skills.json`.
    - [ ] Verify the test fails.
- [ ] Task: Create Sitemap and Robots Script (TDD Green)
    - [ ] Implement `scripts/generate-seo-assets.ts`.
    - [ ] Ensure `robots.txt` is generated and points to the sitemap.
    - [ ] Update `package.json` build script to run this before `vite build`.
    - [ ] Verify the tests pass.
- [ ] Task: Conductor - User Manual Verification 'Automated SEO Assets Generation' (Protocol in workflow.md)
