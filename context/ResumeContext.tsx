"use client";
import { analyzeResume } from "@/actions/resumeReview.action";
import { ResumeAnalysis, UploadState } from "@/lib/types";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { mockAnalysis } from "@/lib/mockAnalysis";

interface ResumeContextType {
  uploadState: UploadState;
  analysis: ResumeAnalysis | null;
  selectedJobRole: string;
  setUploadState: React.Dispatch<React.SetStateAction<UploadState>>;
  setAnalysis: React.Dispatch<React.SetStateAction<ResumeAnalysis | null>>;
  setSelectedJobRole: React.Dispatch<React.SetStateAction<string>>;
  uploadResume: (file: File, role: string) => void;
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

  const uploadResume = async (file: File, role: string) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      setUploadState({
        status: "uploading",
        progress: 10,
        file,
      });

      setUploadState((prev) => ({
        ...prev,
        progress: 40,
        status: "analyzing",
      }));

      const analysis = await analyzeResume(buffer, role);
      if (!analysis)
        throw new Error("There was an error analyzing your resume");

      setUploadState((prev) => ({
        ...prev,
        progress: 100,
        status: "complete",
      }));

      setAnalysis(analysis);

      toast.success("Analysis Complete", {
        description: "Your resume has been successfully analyzed",
      });
    } catch (error) {
      // console.error("Error analyzing resume:", error);
      toast.error("Analysis Failed", {
        description: "There was an error analyzing your resume",
      });
      resetState();
    }
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
