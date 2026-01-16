import { z } from 'zod';

export const SkillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  packageName: z.string()
    .min(1, "Package name is required")
    .regex(/^[a-z0-9-_]+$/, "Package name must be lowercase, alphanumeric, and can contain - or _"),
  description: z.string().min(1, "Description is required"),
  githubRepoUrl: z.string().url("Valid GitHub repository URL is required").regex(/github\.com/, "Must be a GitHub URL"),
  tags: z.array(z.string()).optional().default([]),
  author: z.string().optional(),
});

export type Skill = z.infer<typeof SkillSchema>;

export const SkillsListSchema = z.array(SkillSchema);
