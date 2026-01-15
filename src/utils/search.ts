import { Skill } from '../schemas/skill';

export function filterSkills(skills: Skill[], query: string): Skill[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return skills;
  
  return skills.filter(skill => {
    const nameMatch = skill.name.toLowerCase().includes(normalizedQuery);
    const descMatch = skill.description.toLowerCase().includes(normalizedQuery);
    const tagMatch = skill.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery));
    
    return nameMatch || descMatch || tagMatch;
  });
}
