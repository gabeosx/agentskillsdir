import { expect, test, vi, describe, beforeEach } from 'vitest';
import fs from 'fs';
import { generateSitemap, generateRobotsTxt } from '../../scripts/generate-seo-assets';

// Mock fs and path
vi.mock('fs', async () => {
  return {
    default: {
      writeFileSync: vi.fn(),
      readFileSync: vi.fn(),
      existsSync: vi.fn(),
    }
  };
});

describe('SEO Assets Generation', () => {
  const mockSkills = [
    {
      name: 'Weather Assistant',
      packageName: 'weather-assistant',
      description: 'Provides weather updates.',
      githubRepoUrl: 'https://github.com/example/weather',
      tags: ['utility'],
      author: 'Sky'
    },
    {
      name: 'Conductor Agent',
      packageName: 'conductor-agent',
      description: 'Project management tool.',
      githubRepoUrl: 'https://github.com/example/conductor',
      tags: ['productivity'],
      author: 'Team'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock reading skills.json
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockSkills));
    // Mock existsSync to return true
    vi.mocked(fs.existsSync).mockReturnValue(true);
  });

  test('generateSitemap creates a valid sitemap.xml', async () => {
    await generateSitemap();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('sitemap.xml'),
      expect.stringContaining('<?xml version="1.0" encoding="UTF-8"?>')
    );
    
    // Check for root url
    expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('sitemap.xml'),
        expect.stringContaining('<loc>https://skillindex.dev/</loc>')
    );

    // Check for skill urls
    expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('sitemap.xml'),
        expect.stringContaining('<loc>https://skillindex.dev/skill/weather-assistant</loc>')
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('sitemap.xml'),
        expect.stringContaining('<loc>https://skillindex.dev/skill/conductor-agent</loc>')
    );
  });

  test('generateRobotsTxt creates a valid robots.txt', async () => {
    await generateRobotsTxt();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('robots.txt'),
      expect.stringContaining('User-agent: *')
    );
    
    expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('robots.txt'),
        expect.stringContaining('Sitemap: https://skillindex.dev/sitemap.xml')
    );
  });
});
