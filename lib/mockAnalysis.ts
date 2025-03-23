import { ResumeAnalysis } from "./types";

export const mockAnalysis: ResumeAnalysis = {
  score: 78,
  summary:
    "Your resume demonstrates solid experience but could benefit from more quantifiable achievements and targeted keywords for software engineering roles.",
  strengths: [
    "Clear professional experience section",
    "Good educational background",
    "Technical skills are well organized",
  ],
  weaknesses: [
    "Limited quantifiable achievements",
    "Missing some key software engineering keywords",
    "Summary could be more impactful",
  ],
  suggestions: [
    {
      section: "Summary",
      original:
        "Dedicated software engineer with experience in web development.",
      improved:
        "Results-driven software engineer with 5+ years of experience building scalable web applications that drive business growth and enhance user experience.",
      explanation:
        "Add specificity about years of experience and the impact of your work.",
    },
    {
      section: "Experience",
      original: "Developed features for the company's main product.",
      improved:
        "Engineered and deployed 15+ features for the company's flagship product, resulting in a 30% increase in user engagement and 25% reduction in bounce rate.",
      explanation:
        "Quantify your achievements and highlight the business impact.",
    },
    {
      section: "Skills",
      original: "JavaScript, React, Node.js",
      improved:
        "JavaScript (ES6+), React/Redux, Node.js, Express, RESTful APIs, GraphQL, CI/CD, Test-Driven Development, Agile/Scrum",
      explanation:
        "Include more specific technologies and methodologies relevant to modern software engineering roles.",
    },
  ],
  keywordMatch: [
    { keyword: "JavaScript", found: true, importance: "high" },
    { keyword: "React", found: true, importance: "high" },
    { keyword: "Node.js", found: true, importance: "medium" },
    { keyword: "TypeScript", found: false, importance: "high" },
    { keyword: "CI/CD", found: false, importance: "medium" },
    { keyword: "AWS", found: false, importance: "high" },
    { keyword: "Docker", found: false, importance: "medium" },
    { keyword: "Kubernetes", found: false, importance: "low" },
  ],
  sectionScores: [
    {
      name: "Summary",
      score: 65,
      feedback: "Too generic. Make it more specific to your target role.",
    },
    {
      name: "Experience",
      score: 75,
      feedback: "Good structure but lacks quantifiable achievements.",
    },
    { name: "Education", score: 90, feedback: "Well formatted and relevant." },
    {
      name: "Skills",
      score: 70,
      feedback: "Add more relevant technologies and tools.",
    },
    {
      name: "Projects",
      score: 85,
      feedback:
        "Good project descriptions. Consider adding links to repositories.",
    },
  ],
};
