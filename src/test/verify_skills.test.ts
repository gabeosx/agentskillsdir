
import { describe, it, expect } from 'vitest';
import skills from '../../public/skills.json';

describe('Skills Registry', () => {
  it('should include the Apple Container Skill', () => {
    const appleSkill = skills.find(s => s.name === 'Apple Container Skill' || s.githubRepoUrl.includes('apple-container-skill'));
    expect(appleSkill).toBeDefined();
    expect(appleSkill?.githubRepoUrl).toBe('https://github.com/gabeosx/apple-container-skill');
  });

  it('should include Anthropics PDF skill', () => {
    const pdfSkill = skills.find(s => s.githubRepoUrl.includes('anthropics/skills/tree/main/skills/pdf'));
    expect(pdfSkill).toBeDefined();
  });
  
  it('should include Anthropics DOCX skill', () => {
    const docxSkill = skills.find(s => s.githubRepoUrl.includes('anthropics/skills/tree/main/skills/docx'));
    expect(docxSkill).toBeDefined();
  });
});
