import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// Simulate index.html static tags
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'The open standard for LLM extensions. Discover, share, and integrate skills for your AI agents.';
metaDescription.setAttribute('data-rh', 'true');
document.head.appendChild(metaDescription);


// Mock localStorage if it's not available in the test environment
if (typeof window !== 'undefined' && !window.localStorage) {
  const localStorageMock = (function() {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value.toString(); },
      clear: () => { store = {}; },
      removeItem: (key: string) => { delete store[key]; },
      length: 0,
      key: (index: number) => Object.keys(store)[index] || null,
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
}
