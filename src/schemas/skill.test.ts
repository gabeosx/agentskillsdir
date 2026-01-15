import { describe, it, expect } from 'vitest';
import { SkillSchema, SkillsListSchema } from './skill';

describe('SkillSchema', () => {
  it('validates a correct skill object', () => {
    const validSkill = {
      name: 'Test Skill',
      description: 'A test skill for LLMs',
      githubRepoUrl: 'https://github.com/user/repo',
      tags: ['test', 'llm'],
      author: 'Test Author'
    };
    expect(SkillSchema.parse(validSkill)).toEqual({
      ...validSkill
    });
  });

  it('fails if name is missing', () => {
    const invalidSkill = {
      description: 'A test skill for LLMs',
      githubRepoUrl: 'https://github.com/user/repo'
    };
    expect(() => SkillSchema.parse(invalidSkill)).toThrow();
  });

  it('fails if githubRepoUrl is not from github.com', () => {
    const invalidSkill = {
      name: 'Test Skill',
      description: 'A test skill for LLMs',
      githubRepoUrl: 'https://gitlab.com/user/repo'
    };
    expect(() => SkillSchema.parse(invalidSkill)).toThrow();
  });
});

describe('SkillsListSchema', () => {
  it('validates a list of skills', () => {
    const validSkills = [
      {
        name: 'Skill 1',
        description: 'Description 1',
        githubRepoUrl: 'https://github.com/user/repo1'
      },
      {
        name: 'Skill 2',
        description: 'Description 2',
        githubRepoUrl: 'https://github.com/user/repo2'
      }
    ];
    expect(SkillsListSchema.parse(validSkills)).toHaveLength(2);
  });
});
