const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

export async function fetchGitHubStars(repoUrl: string): Promise<number | null> {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') {
      return null;
    }

    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) {
      return null;
    }

    const [owner, repo] = pathParts;
    const cacheKey = `github-stars-${owner}-${repo}`;
    const now = Date.now();

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { stars, timestamp } = JSON.parse(cached);
      if (now - timestamp < CACHE_DURATION) {
        return stars;
      }
    }

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const stars = data.stargazers_count;

    if (typeof stars === 'number') {
      localStorage.setItem(cacheKey, JSON.stringify({ stars, timestamp: now }));
      return stars;
    }

    return null;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return null;
  }
}

export function clearCache() {
  localStorage.clear();
}
