import { z } from "zod";

export const SuggestionSchema = z.object({
  section: z.string(),
  original: z.string().optional(),
  improved: z.string(),
  explanation: z.string(),
});

export const KeywordMatchSchema = z.object({
  keyword: z.string(),
  found: z.boolean(),
  importance: z.enum(["high", "medium", "low"]),
});

export const SectionScoreSchema = z.object({
  name: z.string(),
  score: z.number(),
  feedback: z.string(),
});

export const ResumeAnalysisSchema = z.object({
  score: z.number(),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(SuggestionSchema),
  keywordMatch: z.array(KeywordMatchSchema),
  sectionScores: z.array(SectionScoreSchema),
});

export type ResumeAnalysis = z.infer<typeof ResumeAnalysisSchema>;
