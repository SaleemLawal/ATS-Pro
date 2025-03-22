"use client";
import { ResumeAnalysis, UploadState } from "@/lib/types";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const mockAnalysis: ResumeAnalysis = {
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

interface ResumeContextType {
  uploadState: UploadState;
  analysis: ResumeAnalysis | null;
  selectedJobRole: string;
  setUploadState: React.Dispatch<React.SetStateAction<UploadState>>;
  setAnalysis: React.Dispatch<React.SetStateAction<ResumeAnalysis | null>>;
  setSelectedJobRole: React.Dispatch<React.SetStateAction<string>>;
  uploadResume: (file: File) => void;
  resetState: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    progress: 0,
  });
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [selectedJobRole, setSelectedJobRole] = useState("software_engineer");

  const uploadResume = async (file: File) => {
    // update state to show upload started
    setUploadState({
      status: "uploading",
      progress: 10,
      file,
    });

    setTimeout(() => {
      setUploadState((prev) => ({
        ...prev,
        progress: 40,
        status: "analyzing",
      }));

      // analysis process

      setTimeout(() => {
        setUploadState((prev) => ({
          ...prev,
          progress: 100,
          status: "complete",
        }));

        setAnalysis(mockAnalysis);

        toast.success("Analysis Complete", {
          description: "Your resume has been successfully analyzed",
        });
      }, 2000);
    }, 1500);
  };

  const resetState = () => {
    setUploadState({
      status: "idle",
      progress: 0,
    });
    setAnalysis(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        uploadState,
        analysis,
        selectedJobRole,
        setUploadState,
        setAnalysis,
        setSelectedJobRole,
        uploadResume,
        resetState,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
