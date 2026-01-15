import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { SkillsListSchema } from '../src/schemas/skill.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const filePath = join(__dirname, '../public/skills.json');
  const fileContent = readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);
  
  SkillsListSchema.parse(data);
  console.log('✅ skills.json is valid!');
  process.exit(0);
} catch (error) {
  console.error('❌ skills.json validation failed:');
  console.error(error);
  process.exit(1);
}
