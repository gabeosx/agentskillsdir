import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://skillindex.dev';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DIST_DIR = path.resolve(__dirname, '../dist'); // We might want to write to dist during build, or public before build.
// Writing to public allows it to be copied by vite during build.
const OUTPUT_DIR = PUBLIC_DIR;

export async function generateSitemap() {
  try {
    const skillsPath = path.join(PUBLIC_DIR, 'skills.json');
    if (!fs.existsSync(skillsPath)) {
      console.warn('skills.json not found, skipping sitemap generation.');
      return;
    }

    const skillsData = fs.readFileSync(skillsPath, 'utf-8');
    const skills = JSON.parse(skillsData);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${skills.map((skill: any) => `
  <url>
    <loc>${BASE_URL}/skill/${skill.packageName}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemap);
    console.log('sitemap.xml generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

export async function generateRobotsTxt() {
  try {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), robotsTxt);
    console.log('robots.txt generated successfully.');
  } catch (error) {
    console.error('Error generating robots.txt:', error);
  }
}

// Check if this script is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await generateSitemap();
    await generateRobotsTxt();
  })();
}
