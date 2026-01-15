import { describe, it, expect } from 'vitest';
import { filterSkills } from './search';
import type { Skill } from '../schemas/skill';

const mockSkills: Skill[] = [
  {
    name: 'React Skill',
    description: 'Frontend library',
    githubRepoUrl: 'https://github.com/facebook/react',
    tags: ['ui', 'js']
  },
  {
    name: 'Vitest Helper',
    description: 'Testing utility',
    githubRepoUrl: 'https://github.com/vitest-dev/vitest',
    tags: ['test']
  }
];

describe('filterSkills', () => {
  it('returns all skills when query is empty', () => {
    expect(filterSkills(mockSkills, '')).toHaveLength(2);
  });

  it('filters by name', () => {
    const result = filterSkills(mockSkills, 'react');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('React Skill');
  });

  it('filters by description', () => {
    const result = filterSkills(mockSkills, 'utility');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Vitest Helper');
  });

  it('filters by tags', () => {
    const result = filterSkills(mockSkills, 'js');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('React Skill');
  });

  it('is case insensitive', () => {
    const result = filterSkills(mockSkills, 'VITEST');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Vitest Helper');
  });
});
