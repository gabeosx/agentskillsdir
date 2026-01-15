import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { fetchGitHubStars, clearCache } from './github';

describe('fetchGitHubStars', () => {
  const localStorageMock = (function() {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => { store[key] = value.toString(); }),
      clear: vi.fn(() => { store = {}; }),
      removeItem: vi.fn((key: string) => { delete store[key]; }),
      length: 0,
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
    };
  })();

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    globalThis.fetch = vi.fn();
    clearCache();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches stars for a valid GitHub repository', async () => {
    const mockRepoUrl = 'https://github.com/test-owner/test-repo';
    const mockStars = 1234;

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stargazers_count: mockStars }),
    });

    const stars = await fetchGitHubStars(mockRepoUrl);
    
    expect(globalThis.fetch).toHaveBeenCalledWith('https://api.github.com/repos/test-owner/test-repo');
    expect(stars).toBe(mockStars);
  });

  it('returns null when the API request fails', async () => {
    const mockRepoUrl = 'https://github.com/test-owner/test-repo';

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    const stars = await fetchGitHubStars(mockRepoUrl);
    expect(stars).toBeNull();
  });

  it('returns null for invalid GitHub URLs', async () => {
    const invalidUrl = 'https://gitlab.com/test/repo';
    const stars = await fetchGitHubStars(invalidUrl);
    
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(stars).toBeNull();
  });
  
  it('handles network errors gracefully', async () => {
    const mockRepoUrl = 'https://github.com/test-owner/test-repo';
    
    (globalThis.fetch as Mock).mockRejectedValueOnce(new Error('Network error'));
    
    const stars = await fetchGitHubStars(mockRepoUrl);
    expect(stars).toBeNull();
  });

  it('uses cached value for subsequent calls', async () => {
    const mockRepoUrl = 'https://github.com/test-owner/test-repo';
    const mockStars = 500;

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stargazers_count: mockStars }),
    });

    // First call - should hit the API
    const stars1 = await fetchGitHubStars(mockRepoUrl);
    expect(stars1).toBe(mockStars);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    // Second call - should use cache
    const stars2 = await fetchGitHubStars(mockRepoUrl);
    expect(stars2).toBe(mockStars);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });
});
