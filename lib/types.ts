import React from "react";

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ResumeAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: Suggestion[];
  keywordMatch: KeywordMatch[];
  sectionScores: SectionScore[];
}
export interface Suggestion {
  section: string;
  original?: string;
  improved: string;
  explanation: string;
}

export interface KeywordMatch {
  keyword: string;
  found: boolean;
  importance: "high" | "medium" | "low";
}

export interface SectionScore {
  name: string;
  score: number;
  feedback: string;
}

export interface UploadState {
  status: "idle" | "uploading" | "analyzing" | "complete" | "error";
  progress: number;
  error?: string;
  file?: File;
}
