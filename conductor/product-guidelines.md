# Product Guidelines

## 1. Tone and Voice
- **Technical & Precise:** Our communication is direct and technically accurate. We prioritize clarity over flourish, ensuring that developers and tool builders can quickly understand the standard and the registry's structure.
- **Efficient:** We respect the user's time. Documentation and UI text should be concise and focused on the task at hand.

## 2. Visual Identity & Design (Terminal Aesthetic)
- **Typography:** Monospaced fonts (e.g., JetBrains Mono, Fira Code) are the primary typeface for both code and general UI text to reinforce the technical nature of the project.
- **Color Palette:** A high-contrast dark theme by default. Backgrounds should be deep (e.g., `#0a0a0a`), with text in crisp whites or light grays, and accents in "terminal" colors like lime green (`#00ff00`) or amber.
- **UI Elements:** Use minimalist borders, often employing box-drawing characters or simple CSS borders. Avoid rounded corners, shadows, or gradients that deviate from a classic CLI feel.
- **Interactions:** Subtle animations (like a blinking cursor or slight scanline effect) can be used to enhance the theme, provided they do not hinder performance or accessibility.

## 3. Code Style & Documentation
- **Machine-First:** Documentation for the `skills.json` schema must be exhaustive and include examples for every field.
- **Contribution Guide:** The process for forking and submitting PRs should be documented with clear, step-by-step terminal commands.

## 4. Performance & Accessibility
- **Static & Fast:** Since the site is deployed to Cloudflare Pages and runs entirely client-side, it must be lightweight with minimal external dependencies.
- **Keyboard Navigable:** In keeping with the terminal theme, the entire site should be easily navigable via keyboard shortcuts.
